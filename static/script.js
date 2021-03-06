var files = [];

document.getElementById("upload-btn").onclick = function (){
  document.getElementById('file').click();
};

document.getElementById("file").onchange = function()
{
  if(document.getElementById("file").files.length!=0)
  {
    files.push(document.getElementById("file").files[0]);
  }
    render_tiles();
    document.getElementById('file').files = new FileListItems([]);
};

function render_tiles()
{
  document.getElementById('filenames').textContent = '';

  for (index in files)
  {
      var tile = document.createElement('div');
      tile.className = "tile";


      var topbar = document.createElement('div');
      topbar.className = "bar";
      topbar.innerHTML = files[index].name;


      var botbar = document.createElement('div');
      botbar.className = "bar";


      var remove = document.createElement('div');
      remove.className='tile_content';
      remove.textContent = "Delete";
      remove.id = index;
      remove.addEventListener("click", function(){files.pop(index);render_tiles();});
      remove.addEventListener("mouseover",function(){this.parentElement.parentElement.className="tile_active";});
      remove.addEventListener("mouseout",function(){this.parentElement.parentElement.className="tile";});


      document.getElementById('filenames').appendChild(tile);
      tile.appendChild(topbar);
      tile.appendChild(botbar)
      botbar.appendChild(remove);
  }
}




function FileListItems (files) {
  var b = new ClipboardEvent("").clipboardData || new DataTransfer()
  for (var i = 0, len = files.length; i<len; i++)
  {
    b.items.add(files[i])
  }
  return b.files
}


document.getElementById("convert").onclick = function () {
  if(files.length>0)
  {
    document.getElementById('file').files = new FileListItems(files);
    document.getElementById("file-upload").submit();
    files=[]
    render_tiles();
  }
}
