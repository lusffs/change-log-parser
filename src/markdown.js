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
};

module.exports = markdown;
