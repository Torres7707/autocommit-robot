const request = require("request");
const fs = require("fs").promises;
const path = require("path");
const { promisify } = require("util");

const id = (~~(Math.random() * 100000)).toString(); // 获取小于10w的数字
const url = `https://robohash.org/${id}`;
const dirPath = path.resolve(__dirname, "pictures");

// 获取当前日期并格式化为需要的文件名格式
const currentDate = new Date().toLocaleDateString("en", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

async function downloadImage(url, destination) {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(destination);
    request(url)
      .pipe(writeStream)
      .on("close", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function main() {
  try {
    if (!fs.existsSync(dirPath)) {
      await fs.mkdir(dirPath);
    }

    const filePath = path.join(dirPath, `${currentDate}.png`);
    await downloadImage(url, filePath);

    console.log(`Image downloaded and saved to: ${filePath}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
