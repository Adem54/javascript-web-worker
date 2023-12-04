
//this-self ayni seydir window u temsil ediyor
self.onmessage =  (event)=>{
 console.log('event-worker.js', event )
 //event icindeki data proeprtysi icerisine front.js den buraya gonderilen worker1.postMessage({arrayNumbers:numbers, messageString:"Hello, worker!!"}) bu datalari alabiliyruz
//gonderilen array i alacagiz
const numbers = event.data.arrayNumbers;	

//Islemi 5 saniye sonra yapsin, zaman gectigini anlamak icin boyle yapalim...cunku bizim genellikle kullanicilarimzdan gelen sikayetler onlar buttojna basmaya calsiyorlar ama bir oncesinde sayfa yukleme durumunda iken uzak endpointten data yuklenmesi bekleniyor...ama o tamamlanamadigi icin kullanici nin butona basmasi ile bironceki islem bitmedigi icin, sayfa da donma islemlerde bloklanma gerceklesiyor..


setTimeout(async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await response.json();
// numbers = data;

postMessage({isLoopFinished:true, message:"Loop opearation is finished!", data:JSON.stringify(data)});
}, 5000);

//Bu islem bu sekilde 6-7 saniye surerken kullanicimz ister gider diger buttonlar la ilgili interaction larin yapar, ister se sayfa degistirir, diger sayfalarda gezinir...Yani burdaki islemin uzun surmesi hicbir sekilde diger islemleri bloklamayacak, sayfa yuklenmeleri dondurmayacak, kullanicimizin digger islemleri yapmasina engel olamayacak...BU MUTHIS BIR COZUMDUR...COK IHTIYACIMZ OLACAK BUNA

//Bir request i simule etmek icin boyle yaptik bunu
/*
setTimeout(() => {
	for (let index = 0; index < 100000000; index++) {
			
		numbers.push(index);
	}

	postMessage({isLoopFinished:true, message:"Loop opearation is finished!", data:numbers});
}, 5000);  */
//WORKER DAKI  for dongusunun bitiip bizim bekledimgz data nin hazir oldugunu bize haber vermesini istiyoruz...ki tekrardan onu front.js e gondersin!!!! 
//Burda gonderilen data yi biz nerden aliyoruz nerde gorebilliyoruz....TAbi ki front.js dosyasinda  success kisminda...bu islemin bittigi haberini alabiliyoruz
/*
	window.addEventListener("load", ()=>{
	worker1.onerror = (event)=>{
		console.log("error", event)
	}
	worker1.onmessage = (event)=>{
		console.log("success: ",event);
	}
})

*/



}
/*
Bu cozum gercekten harika bir yaklasim.....VE OZELLIKLE COK UZUN SUREN SISTEMI YORAN, BIR SONRAKI ISLEMLERE IZIN VERMEYEN...BLLOKLAYAN..SISTEMIN DONMASINI SAGLAYAN KULLANICININ ISLEM YAPMASINI ENGELLEYEN ISLEMLERI COZMEK ICIN...HARIKA BIR COZUM YOLU!!!
*/


