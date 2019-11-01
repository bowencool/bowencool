import { expect } from 'chai';
import { toThousand, currency, time, privacy } from './filters';

describe('全局过滤器的测试', () => {
  describe('#toThousand', () => {
    it('正常数字', () => {
      expect(toThousand(12345678)).to.equal('12,345,678');
    });
    it('带小数', () => {
      expect(toThousand(56.78)).to.equal('56.78');
    });
    it('字符串', () => {
      expect(toThousand('12345678')).to.equal('12,345,678');
    });
    it('带前缀字符', () => {
      expect(toThousand('￥123456.78')).to.equal('￥123,456.78');
    });
    it('带后缀字符', () => {
      expect(toThousand('￥123456.78元')).to.equal('￥123,456.78元');
    });
  });

  describe('#currency', () => {
    it('正常数字', () => {
      expect(currency(12345678)).to.equal('￥123,456.78');
    });
    it('带小数', () => {
      expect(currency(56.78)).to.equal('￥0.57');
    });
    it('NaN', () => {
      expect(currency(NaN)).to.equal('￥0.00');
    });
    it('无穷大', () => {
      expect(currency(1 / 0)).to.equal('￥0.00');
    });
    it('字符串', () => {
      expect(currency('12345678')).to.equal('￥123,456.78');
    });
    it('无需前缀字符', () => {
      expect(currency('123', false)).to.equal('1.23');
    });
  });

  describe('#time', () => {
    it('时间戳', () => {
      expect(time(1557131449947)).to.equal('2019-05-06 16:30:49');
    });
    it('时间戳字符串', () => {
      expect(time('1557131449947')).to.equal('2019-05-06 16:30:49');
    });
    it('unix(10位)时间戳', () => {
      expect(time(1557131449)).to.equal('2019-05-06 16:30:49');
    });
    it('字符串日期', () => {
      expect(time('2019-05-06 16:30:49')).to.equal('2019-05-06 16:30:49');
    });
    it('Date 对象', () => {
      expect(time(new Date('2019-05-06'))).to.equal('2019-05-06 08:00:00');
    });
    it('自定义格式', () => {
      expect(
        time(new Date('2019-05-06 16:30:49'), 'YYYY/MM/DD_HH:mm'),
      ).to.equal('2019/05/06_16:30');
    });
    it('为null', () => {
      expect(time(null)).to.equal('');
    });
  });

  describe('#privacy', () => {
    it('正常', () => {
      expect(privacy('123456789', 1, 2)).to.equal('1******89');
    });
    it('全部隐藏', () => {
      expect(privacy('123456789', 9, 0)).to.equal('*********');
    });
    it('全部隐藏2', () => {
      expect(privacy('123456789', 0, 9)).to.equal('*********');
    });
    it('全部隐藏3', () => {
      expect(privacy('123456789', 9, 9)).to.equal('*********');
    });
    it('超出长度', () => {
      expect(privacy('1234567', 8, 0)).to.equal('*******');
    });
    it('超出长度2', () => {
      expect(privacy('1234567', 0, 8)).to.equal('*******');
    });
    it('超出长度3', () => {
      expect(privacy('1234567', 8, 8)).to.equal('*******');
    });
  });
});
