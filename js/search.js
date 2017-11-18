// 主线:
// 1.当页面打开 到search.html，要获取搜索历史
// 如果有历史搜索 显示历史记录
// 如果没有历史搜索 告诉用户没有记录

// 2.当用户在输入框中输入搜索词 
// 应该把用户输入的搜索词加入历史记录

// 3.当用户点击删除按钮 我们要删除一条记录

// 4.显示所有的记录

$(function(){
  // 1. 当页面载入的时候显示历史记录
  // setHistoryData('addids');
  showHistoryData();

  // 2.点击搜索按钮 把关键词加入历史记录
  var searchInput = $('.search-box input');
  $('#search-btn').on('tap',function(){
    var keyWord  = searchInput.val();
    setHistoryData(keyWord);
    location.href = './searchList.html?proName='+keyWord;
    showHistoryData();
  })

  // 3.点击清空历史按钮 清空历史记录 
  $('#clear-history').on('tap',function(){
    // 为什么不用localStorage.clear(); 怕影响其他网站或本网站的功能
    localStorage.removeItem('ltHistory');
  })

  // 4.点击删除按钮  删除一条数据
  $(".search-history-list").on('tap','i',function(){
    var deleteData = $(this).siblings('span').html();
      // console.log(deleteData);
    removeHistoryData(deleteData);
    showHistoryData();
  })

  // 5.点击历史列表中的字 把这个字放到地址栏中跳转进行搜索
  $('.search-history-list').on('tap','span',function(){
    var keyWord = $(this).html();
    // console.log(keyWord);
    // 如何把当前页面的关键字传入searchList.html
    location.href = './searchList.html?proName='+keyWord;
  })
})

// 获取搜索记录
var getHistoryData = function(){
  return JSON.parse( window.localStorage.getItem('ltHistory')||'[]');
}

// console.log(getHistoryData());
// 设置搜索记录
// key =value
// ltHistory = '["nike","add"]'
var setHistoryData = function(value){
  // 获取历史记录
  var list = getHistoryData();

  // 遍历数据(去除重复数据)
  $.each(list,function(i,item){
    if(value == item) {
      list.splice(i,1);
    }
  });

  list.push(value);

  localStorage.setItem('ltHistory',JSON.stringify(list));
}

// 移除数据
 
// 思路: 首先我要获取到历史记录,
var removeHistoryData = function(value){
  var list = getHistoryData();//获取历史记录

  // 找到和历史记录列表中的某一项一样的数组元素 切掉
  $.each(list,function(i,item){
    if(value == item) {
      list.splice(i,1);
    }
  })

  // 把切掉的后的数组 放回历史记录中
  window.localStorage.setItem('ltHistory',JSON.stringify(list));
}

// 显示历史记录
var showHistoryData = function(){
  var list = getHistoryData();//空数组或有长度的数组
  if(list.length == 0) {
    // 告诉用户没有历史记录
    $('.empty-history').show();
    $('.search-history').hide()

  }else {
    // 展示历史记录
    var historyList = template('historyTemplate',
    {
      // list: ['nike','gucci']
      list:list
    });

    $('.search-history-list').html(historyList);
    $('.search-history').show();
    $('.empty-history').hide();
  }
}


