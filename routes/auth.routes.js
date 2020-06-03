const { Router } = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({
      min: 8,
    }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }

      const { email, password } = request.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return response
          .status(400)
          .json({ message: 'Такой пользователь уже существует' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();
      response.status(201).json({ message: 'Пользователь создан' });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте снова!' });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!error.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        });
      }

      const { email, password } = request.body;

      const user = await User.findOne({ email });
      if (!user) {
        return response.status(400).json({ message: 'Пользователь не найден' });
      }

      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return response
          .status(400)
          .json({ message: 'Пароль не верный, попробуйте снова' });
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      });
      response.status(200).json({ token, userId: user.id });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте снова!' });
    }
  }
);

module.exports = router;
