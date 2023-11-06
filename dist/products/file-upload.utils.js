"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileFilter = exports.editFilename = void 0;
const constants_1 = require("../utils/constants");
const editFilename = (req, file, cb) => {
    const filename = file.originalname.split('.')[0];
    const fileExtention = file.originalname.split('.')[1];
    const newFileName = filename.split(' ').join('_') + '_' + Date.now() + '.' + fileExtention;
    cb(null, newFileName);
};
exports.editFilename = editFilename;
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
        req[constants_1.UNSUPPORTED_FILE] = true;
        cb(null, false);
    }
    cb(null, true);
};
exports.imageFileFilter = imageFileFilter;
//# sourceMappingURL=file-upload.utils.js.map