let contractAddr = '0xbb460fbd275aAb7B5f7ED819b457cC15F5b255cf';

function onInput() {
	let imgurId = document.querySelector('input[name="imgurId"]').value;
	document.querySelector('img').src = `https://i.imgur.com/${imgurId}.png`;
	
	let nftId = unwrap(imgurId);
	
	document.querySelector('input[name="nftId"]').value = nftId===false ? 'Error!!' : nftId;
	
	let link = nftId ? `https://oasis.cash/token/${contractAddr}/${nftId}` : '';
	document.querySelector('a').href = link;
	document.querySelector('a').textContent = link;
}

function unwrap(imgurId) {
	imgurId = imgurId.toString();
	
	if(imgurId.length <= 0) return '';
	
	let nftId = 0n;
	
	for(let i=0;i<imgurId.length;++i) {
		nftId *= 64n;
		
		let c = imgurId.charCodeAt(i);
		
		if(c>=0x41 && c<=0x5a) {
			nftId += BigInt(c-0x41+1);
		} else if(c>=0x61 && c<=0x7a) {
			nftId += BigInt(c-0x61+27);
		} else if(c>=0x30 && c<=0x39) {
			nftId += BigInt(c-0x30+53);
		} else {
			return false;
		}
	}
	
	return nftId.toString();
}
