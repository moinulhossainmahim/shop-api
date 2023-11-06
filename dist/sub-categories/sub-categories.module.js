"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const sub_categories_controller_1 = require("./sub-categories.controller");
const sub_categories_service_1 = require("./sub-categories.service");
const typeorm_1 = require("@nestjs/typeorm");
const SubCategory_1 = require("../entity/SubCategory");
const Categories_1 = require("../entity/Categories");
let SubCategoriesModule = exports.SubCategoriesModule = class SubCategoriesModule {
};
exports.SubCategoriesModule = SubCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([SubCategory_1.SubCategory, Categories_1.Categories])],
        controllers: [sub_categories_controller_1.SubCategoriesController],
        providers: [sub_categories_service_1.SubCategoriesService],
        exports: [sub_categories_service_1.SubCategoriesService],
    })
], SubCategoriesModule);
//# sourceMappingURL=sub-categories.module.js.map