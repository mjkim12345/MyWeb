const express = require('express');
const router = express.Router();
const { getTableList } = require('../models');

router.get('/', async (req, res) => {
  try {
    const tableList = await getTableList();
    res.render('index', { tableList });
  } catch (error) {
    console.error('테이블 리스트 조회 중 오류가 발생하였습니다:', error);
  }
});

module.exports = router;
