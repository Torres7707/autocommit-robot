const request = require("request");
const path = require("path");
const fs = require("fs");

const dirPath = path.resolve(__dirname, "pictures");

// 确保目录存在
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath);
}

// 删除目录中的所有旧图片
fs.readdirSync(dirPath).forEach((file) => {
	if (file.endsWith(".png")) {
		fs.unlinkSync(path.join(dirPath, file));
	}
});

const id = (~~(Math.random() * 100000)).toString();
const url = `https://robohash.org/${id}`;

const dateArr = new Date().toLocaleDateString().split("/");
dateArr.unshift(dateArr.pop());
const date = dateArr.join("-");

request(url).pipe(fs.createWriteStream(`${dirPath}/${date}.png`));
