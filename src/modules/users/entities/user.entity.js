"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEntity = void 0;
var typeorm_1 = require("typeorm");
var UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('increment')
    ], UserEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ length: 30 })
    ], UserEntity.prototype, "username");
    __decorate([
        (0, typeorm_1.Column)({ length: 30 })
    ], UserEntity.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)()
    ], UserEntity.prototype, "male");
    __decorate([
        (0, typeorm_1.Column)({ length: 30 })
    ], UserEntity.prototype, "role");
    __decorate([
        (0, typeorm_1.Column)()
    ], UserEntity.prototype, "height");
    __decorate([
        (0, typeorm_1.Column)()
    ], UserEntity.prototype, "weight");
    UserEntity = __decorate([
        (0, typeorm_1.Entity)('users')
    ], UserEntity);
    return UserEntity;
}());
exports.UserEntity = UserEntity;
