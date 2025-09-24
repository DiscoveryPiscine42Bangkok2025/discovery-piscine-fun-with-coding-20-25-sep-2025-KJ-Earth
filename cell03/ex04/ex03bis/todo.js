$(function(){
  function getTodos(){
    const row = document.cookie.split('; ').find(r => r.startsWith('todos='));
    if(!row) return [];
    try { return JSON.parse(decodeURIComponent(row.split('=')[1])); }
    catch(e){ return []; }
  }
  function saveTodos(arr){
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(arr)) + ";path=/";
  }
  function render(){
    const $list = $("#ft_list").empty();
    const todos = getTodos();
    // วางรายการใหม่ไว้ "บนสุด" ตามสเปก
    $.each(todos, function(i, text){
      const $item = $("<div>").text(text);
      $item.on("click", function(){
        if(confirm("Remove this task?")){
          todos.splice(i,1);
          saveTodos(todos);
          render();
        }
      });
      $list.prepend($item);
    });
  }
  $("#newBtn").on("click", function(){
    const t = prompt("Enter a new TO DO:");
    if(t && t.trim()!==""){
      const todos = getTodos();
      todos.unshift(t.trim());
      saveTodos(todos);
      render();
    }
  });
  render();
});
