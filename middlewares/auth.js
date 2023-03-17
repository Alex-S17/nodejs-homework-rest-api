// Middleware auth извлекает токен из заголовка и:
// 1. проверяет валидность токена (то есть что токен был выдан и не истек);
// 2.извлекает из токена id, находит в базе пользователя с таким id и прикрепляет его к запросу (req.user)

// Итак, в приведенном ниже коде мы должны:
// 1. Извлечь из заголовков запроса содержимое заголовка Authorization
// 2. Разделить его на два слова: bearer и токен
// 3. Проверить, равно ли первое слово "Bearer"
// 4. Проверить валидность второго слова (токен)
// 5. Если токен валиден - извлечь из него id и найти в базе пользователя с таким id
// 6. Если пользователь с таким id найден в базе - прикрепить его к запросу (объект req)

const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = {
  auth,
};
