const catchAsync = require('../utils/catchAsync');

const getDashboard = catchAsync(async (req, res) => {
  res.json({ title: 'GeeksforGeeks' });
});

const getReportProduct = catchAsync(async (req, res) => {
  const data = [];
  for (let index = 1; index < 13; index += 1) {
    const item = { month: index.toString(), total: Math.floor(Math.random()) };
    data.push(item);
  }
  res.send(data);
});
const getIncome = catchAsync(async (req, res) => {
  const data = [];
  for (let index = 1; index < 13; index += 1) {
    const item = { month: index.toString(), total: Math.floor(Math.random()) };
    data.push(item);
  }
  res.send(data);
});
const getContact = catchAsync(async (req, res) => {
  const data = [];
  for (let index = 1; index < 13; index += 1) {
    const item = { month: index.toString(), count: Math.floor(Math.random()) };
    data.push(item);
  }
  res.send(data);
});

module.exports = {
  getDashboard,
  getReportProduct,
  getIncome,
  getContact,
};
