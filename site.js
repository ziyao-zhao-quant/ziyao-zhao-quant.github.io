(() => {
  'use strict';
  const data = window.SITE_CONTENT || {};
  const profile = data.profile || {};
  const $ = id => document.getElementById(id);
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text != null) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  function safeUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, window.location.href);
      return ['https:', 'http:', 'mailto:'].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }
  function link(label, value) {
    const href = safeUrl(value);
    if (!href) return null;
    const node = el('a', label + ' ↗');
    node.href = href;
    if (new URL(href).origin !== window.location.origin && !href.startsWith('mailto:')) {
      node.target = '_blank'; node.rel = 'noopener noreferrer';
    }
    return node;
  }
  function links(items, parent) {
    const group = el('div', null, 'entry-links');
    for (const item of items || []) {
      const a = link(item.label || '查看详情', item.url);
      if (a) group.append(a);
    }
    if (group.childElementCount) parent.append(group);
  }
  function renderList(id, items, render) {
    if (!Array.isArray(items) || !items.length) return;
    $(id).replaceChildren(...items.map(render));
  }
  $('year').textContent = new Date().getFullYear();
  if (profile.name) {
    $('brand-name').textContent = profile.name;
    $('footer-name').textContent = profile.name;
    document.title = `${profile.name} · ${profile.role || '量化研究'}`;
  }
  $('identity').textContent = [profile.name, profile.role].filter(Boolean).join(' / ') || '量化研究员';
  if (profile.name) document.querySelector('.hero-name').textContent = profile.name;
  for (const item of profile.education || []) {
    const block = el('div', null, 'education-item');
    block.append(el('div', item.period, 'meta'), el('h2', item.school), el('p', item.degree));
    $('education').append(block);
  }
  if (profile.intro) {
    $('intro').textContent = profile.intro;
    document.querySelector('meta[name="description"]').content = profile.intro;
  }
  const cv = safeUrl(profile.cv);
  if (cv) { $('cv-link').href = cv; $('cv-link').hidden = false; }
  const contacts = [
    [profile.email, profile.email ? 'mailto:' + profile.email : ''],
    ['GitHub', profile.github], ['Google Scholar', profile.scholar], ['LinkedIn', profile.linkedin],
  ];
  for (const [label, url] of contacts) {
    const node = link(label, url);
    if (node) $('contact-links').append(node);
  }
  if (profile.contactNote) $('contact-note').textContent = profile.contactNote;
  else if ($('contact-links').childElementCount) $('contact-note').textContent = '欢迎交流研究想法、项目与合作机会。';
  function entry(item, type) {
    const article = el('article', null, 'entry');
    const meta = type === 'publication' ? [item.year, item.venue] : [item.period];
    if (meta.some(Boolean)) article.append(el('div', meta.filter(Boolean).join(' / '), 'meta'));
    article.append(el('h3', item.title));
    if (item.authors) article.append(el('div', item.authors, 'meta'));
    if (item.description) article.append(el('p', item.description));
    if (item.tags?.length) {
      const tags = el('div', null, 'tags');
      for (const tag of item.tags) tags.append(el('span', tag, 'tag'));
      article.append(tags);
    }
    links(item.links, article);
    return article;
  }
  renderList('research-list', data.publications, item => entry(item, 'publication'));
  renderList('projects-list', data.projects, item => entry(item, 'project'));
  renderList('experience-list', data.experience, item => {
    const article = entry({ title: item.organization, period: item.period, description: item.description }, 'experience');
    if (item.role) article.querySelector('h3').after(el('div', item.role, 'meta'));
    if (item.highlights?.length) {
      const list = el('ul');
      for (const text of item.highlights) list.append(el('li', text));
      article.append(list);
    }
    return article;
  });
  function equityChart(rows, title) {
    const figure = el('figure', null, 'chart');
    const hasBenchmark = rows.some(row => row.benchmark != null);
    const valid = rows.length >= 2 && rows.every((row, i) =>
      typeof row.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(row.date) &&
      Number.isFinite(Date.parse(row.date)) && new Date(row.date).toISOString().slice(0, 10) === row.date &&
      (!i || row.date > rows[i - 1].date) &&
      Number.isFinite(row.strategy) && row.strategy > 0 &&
      (!hasBenchmark || (Number.isFinite(row.benchmark) && row.benchmark > 0)));
    if (!valid) return el('p', '净值数据暂不可用，请检查日期顺序、缺失值与净值数值。', 'chart-error');
    const caption = el('figcaption', '累计净值');
    const legend = el('span', null, 'chart-legend');
    legend.append(el('span', '━ 策略', 'legend-strategy'));
    if (hasBenchmark) legend.append(el('span', '┄ 基准', 'legend-benchmark'));
    caption.append(legend); figure.append(caption);
    const svgNode = (tag, attrs, text) => {
      const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
      if (text != null) node.textContent = text;
      return node;
    };
    const svg = svgNode('svg', { viewBox: '0 0 880 300', role: 'img', 'aria-label': `${title}，${rows[0].date} 至 ${rows.at(-1).date} 累计净值曲线。原始数据见下方表格。` });
    const values = rows.flatMap(row => hasBenchmark ? [row.strategy, row.benchmark] : [row.strategy]);
    let low = values.reduce((a, b) => Math.min(a, b), Infinity), high = values.reduce((a, b) => Math.max(a, b), -Infinity);
    const pad = (high - low) * .1 || high * .05;
    low -= pad; high += pad;
    const start = Date.parse(rows[0].date), duration = Date.parse(rows.at(-1).date) - start;
    const x = row => 62 + (Date.parse(row.date) - start) / duration * 796;
    const y = value => 252 - (value - low) / (high - low) * 224;
    for (let i = 0; i < 5; i++) {
      const value = low + (high - low) * i / 4;
      svg.append(svgNode('line', { x1: 62, x2: 858, y1: y(value), y2: y(value), stroke: '#ffffff20' }));
      svg.append(svgNode('text', { x: 50, y: y(value) + 5, fill: '#bdc8d6', 'font-size': 14, 'text-anchor': 'end' }, value.toFixed(2)));
    }
    for (const [key, color] of [['strategy', '#f3a76a'], ...(hasBenchmark ? [['benchmark', '#abb9c9']] : [])]) {
      const d = rows.map((row, i) => `${i ? 'L' : 'M'}${x(row).toFixed(2)},${y(row[key]).toFixed(2)}`).join(' ');
      svg.append(svgNode('path', { d, fill: 'none', stroke: color, 'stroke-width': 2.5, ...(key === 'benchmark' ? { 'stroke-dasharray': '7 5' } : {}) }));
    }
    svg.append(svgNode('text', { x: 62, y: 286, fill: '#bdc8d6', 'font-size': 14 }, rows[0].date));
    svg.append(svgNode('text', { x: 858, y: 286, fill: '#bdc8d6', 'font-size': 14, 'text-anchor': 'end' }, rows.at(-1).date));
    const plot = el('div', null, 'chart-plot'); plot.append(svg); figure.append(plot);
    const details = el('details'); details.append(el('summary', '查看净值数据'));
    const wrap = el('div', null, 'table-wrap');
    const table = el('table');
    const thead = el('thead'), head = el('tr');
    for (const label of ['日期', '策略净值', ...(hasBenchmark ? ['基准净值'] : [])]) { const th = el('th', label); th.scope = 'col'; head.append(th); }
    thead.append(head); table.append(thead);
    const tbody = el('tbody');
    for (const row of rows) {
      const tr = el('tr');
      for (const value of [row.date, row.strategy, ...(hasBenchmark ? [row.benchmark] : [])]) tr.append(el('td', value));
      tbody.append(tr);
    }
    table.append(tbody); wrap.append(table); details.append(wrap); figure.append(details);
    return figure;
  }
  renderList('strategies-list', data.strategies, item => {
    const article = el('article', null, 'strategy-card');
    article.append(el('h3', item.title));
    if (item.description) article.append(el('p', item.description));
    const meta = el('div', null, 'strategy-meta');
    for (const [label, value] of [['回测区间', item.period], ['比较基准', item.benchmark], ['交易费用', item.costs], ['回测方法', item.methodology]]) {
      const row = el('div'); row.append(el('strong', label + '：'), document.createTextNode(value || '未提供')); meta.append(row);
    }
    article.append(meta);
    if (item.metrics?.length) {
      const metrics = el('div', null, 'metrics');
      for (const metric of item.metrics) { const node = el('div', null, 'metric'); node.append(el('span', metric.label), el('strong', metric.value)); metrics.append(node); }
      article.append(metrics);
    }
    if (Array.isArray(item.equity) && item.equity.length) article.append(equityChart(item.equity, item.title));
    if (item.note) article.append(el('p', item.note, 'strategy-note'));
    links(item.links, article);
    return article;
  });
})();
