var milk=100;
var water=100;
var espresso=100;
var area1=document.getElementById('area1');
var area2=document.getElementById('area2');
var moving;

function onDrag(event) {
	event.preventDefault();
}
document.getElementById('glass').addEventListener('dragstart', onDrag);

function onUpdate() {
	document.getElementById('water').setAttribute('style', 'top:'+ milk + 'px; height:'+ water + 'px;');
	document.getElementById('espresso').setAttribute('style', 'top:'+ (milk+water) + 'px; height:'+ espresso + 'px;');
	document.getElementById('area1').setAttribute('style', 'top:'+ (milk-10) + 'px;');
	document.getElementById('area2').setAttribute('style', 'top:'+ (milk+water-10) + 'px;');
	document.getElementById('milk').setAttribute('style', 'height:'+ milk + 'px;');
	document.getElementById('milkVolume').innerHTML=~~milk;
	document.getElementById('waterVolume').innerHTML=~~water;
	document.getElementById('espressoVolume').innerHTML=~~espresso;
}

onUpdate();

document.getElementById('glass').addEventListener('mousedown',onStart);
document.getElementById('glass').addEventListener('touchstart',onStart);

function onStart(event) {
	moving=event.target;
	document.getElementById('glass').addEventListener('mousemove', onMove);
	document.getElementById('glass').addEventListener('touchmove', onMove);
	document.getElementById('glass').addEventListener('mouseup', onEnd);
	document.getElementById('glass').addEventListener('touchend', onEnd);
}

function onMove(event) {
	if (event.touches!=undefined) {
		currentY=event.touches[0].pageY-document.getElementById('glass').offsetTop;
		
	} else {
		currentY=event.pageY-document.getElementById('glass').offsetTop;
	}

	if (currentY<0) {
		currentY=0;
	} else if (currentY>300) {
		currentY=300;
	}

	if (moving==area1) {
		milk=currentY;
		water=300-milk-espresso;
	} else if (moving==area2){
		water=currentY-milk;
		espresso=300-milk-water;
	}
	onUpdate();
}

function onEnd(event) {
	document.getElementById('glass').removeEventListener('mousemove', onMove);
	document.getElementById('glass').removeEventListener('touchmove', onMove);
	document.getElementById('glass').removeEventListener('mouseup', onEnd);
	document.getElementById('glass').removeEventListener('touchend', onEnd);
}