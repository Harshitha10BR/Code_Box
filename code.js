class Box{
	constructor(language,topic,code){
		this.language=language;
		this.topic=topic;
		this.code=code;

	}
}
class UI{
	static displayCode(){
		const boxes=localStore.getBoxes();
		
		boxes.forEach((codev)=>UI.addCodeToBox(codev));
	}
	static addCodeToBox(codev){
		const box=document.querySelector('#boxes');
		const row=document.createElement('tr');
		row.innerHTML=`
		<td>${codev.language}</td>
	    <td>${codev.topic}</td>
	    <td><textarea class="form-control" rows=4>${codev.code}</textarea></td>
	    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`
	    ;
	    box.appendChild(row);
	}
	static deleteBox(tar){
		if(tar.classList.contains('delete')){
			tar.parentElement.parentElement.remove();
		}
	}
	static showAlert(message,className){
		const div=document.createElement('div');
		div.className=`alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container=document.querySelector('.container');
		const form=document.querySelector('#code-form');
		container.insertBefore(div,form);
		setTimeout(()=>document.querySelector('.alert').remove(),2000);
	}
	static clearFields(){
		document.querySelector('#language').value='';
		document.querySelector('#topic').value='';
		document.querySelector('#code').value='';
	}
}
class localStore{
	static getBoxes(){
		let boxes;
		if(localStorage.getItem('boxes')===null){
			boxes=[];
		}else{
			boxes=JSON.parse(localStorage.getItem('boxes'));
		}
		return boxes;
	}
	static addBox(box){
		const boxes=localStore.getBoxes();
		boxes.push(box);
		localStorage.setItem('boxes',JSON.stringify(boxes));
	}
	static removeBox(code){
		const boxes=localStore.getBoxes();
		boxes.forEach((box,index)=>{
			if(box.code===code){
				boxes.splice(index,1);
			}
		});
		localStorage.setItem('boxes',JSON.stringify(boxes));
	}
}
document.addEventListener('DOMContentLoaded',UI.displayCode);
document.querySelector('#code-form').addEventListener('submit',(e)=>{
	e.preventDefault();
	 const language=document.querySelector('#language').value;
	 const topic=document.querySelector('#topic').value;
	 const code=document.querySelector('#code').value;
	 if(language===''||topic===''||code===''){
	 	UI.showAlert('Please fill in all fields','danger');
	 }
	 else{



	 const box=new Box(language,topic,code);
	 UI.addCodeToBox(box);
	 localStore.addBox(box);
	 UI.clearFields();
	 UI.showAlert('Saved successfully','success');
	}
	 });
document.querySelector("#boxes").addEventListener('click',(e)=>{
	UI.deleteBox(e.target);
	localStore.removeBox(e.target.parentElement.previousElementSibling.textContent);
	UI.showAlert('Removed successfully','success');

});