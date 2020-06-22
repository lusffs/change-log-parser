var markdown = {
  title: (title, depth) => {
    return `${depth && depth > 0 ? "#".repeat(depth) : "#"} ${title}\n\n`;
  },
  inlineLink: (url, title) => {
    return `[${title}](${url})`;
  },
  bulletList: (items) => {
    let list = "";
    items.forEach((item) => {
      list += `- ${item}\n`;
    });
    list += "\n";
    return list;
  },
  plainText: (text) => {
    return `${text}\n\n`;
  },
  inlineWorkItemLink: (id) => {
    return `#${id}`;
  },
};

module.exports = markdown;
