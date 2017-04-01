// 周次
Date.prototype.weekOfYear = function () {
    var year = this.getFullYear();
    var d = new Date(this);
    d.setHours(0, 0, 0, 0);
    // 当年的第一天
    var yearStart = new Date(year, 0, 1);
    // 修正第一天周数的偏移量
    d.setDate(d.getDate() + yearStart.getDay());
    var deltaDay = (d.getTime() - yearStart.getTime()) / 86400000 + 1;
    var weekNo = Math.ceil(deltaDay / 7);
    return [year, weekNo];
};
