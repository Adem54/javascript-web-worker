
// const worker1 = new Worker('./worker.js');//Bu ornegin a isinden sorumlu isci 
const worker1=null;

//Ayrica bir worker daha tanimlayip o da bambaska bir isten sorumlu isci olabilir
const worker2 = new Worker("./abc.js")//Bu da ornegin b isinden sorumlu isci diyebiiriz 

//Yuklendiiginde..error durumunda error u yaz, success durumunda mesaji  yaz dedik
window.addEventListener("load", ()=>{
	//veya worker1 i burda da baslata biliriz istersek 
	worker1 = new Worker("./worker.js")
	worker1.onerror = (event)=>{
		console.log("error", event)
	}
	worker1.onmessage = (event)=>{
		console.log("success: ",event);
	}
})

const numbers = [];

function onAlert()
{
	alert("Hello Alert")
}


function callWorker1()
{
	worker1 =  new Worker("./worker.js")
}

function onLoop()
{
	//console.log("Hello Loop!!!")
	//Ornegin tam bu satir da uygulamamizin bloklandigi ni dusunelim...yani durdugunu yani cok uzun suren bir islem yapildigindan dolayi uygulama cok bekledigni yani bloklandigini  yani iste ornek olarak da cok uzun suren loop lar...yani eger 1000 data loop icinde doner ve birsuru islem yapar ise...o zaman tabi ki hissedilir derecede performans problemi gorebiliriz
/*
	for (let index = 0; index < 10000000; index++) {
		
		numbers.push(index);
	}
	bu loop islemini worker icinde yapacagiz..
*/

	 worker1.postMessage({arrayNumbers:numbers, messageString:"Hello, worker!!"})
//HARIKA BIR SONUC ALDIK...FOR DONGUSUNUN 0 INI BIR ARTTIRDIM BIR DE, NORMAL WORKER KULLANMADAN ONCE OYLE BIR KASTI KI SAYFA DA HERSEY DONDU AMA WORKERS ILE BIRLIKTE....BU KILIT ACILDI...BLOK KALDIRILDI....HARIKA VE ADVANCE BIR ISLEM!!!!!SU ANDA ALERT BUTTONU ARTIK LOOOP UN BITMESINI BEKLEMEDEN CALISABILIYOR...

	

//Burda artik tum is bittikten sonra worker lar la isimiz bitt i ise amacimiza ulastik ve son olarak calisacak yer burasi bundan sonra artik worker larimizi kapatmaliyiz

worker1.terminate();
//Artik seninle isim bitti..sen isten cikariyoruz...isimizi olursa cagiririz tekrardan...
worker1 = undefined;


}

//onLoop a basacagiz hemen ardindan, onAlert e tiklamak istiyoruz ama henuz onLoop daki islem devam ettigi icin o blokladi ve onAlert e basmama izin vermiyor.....Islemimi kilitliyor, ta ki loop bitene kadar ve benim diger alert islemini  yapmama izin vermiyor..Tabi biz ornegin 3 kere alert e basarsak loop islemi devam ederken, looop islemi bittignde alert 3 kez calisacaktir...
//Bu durum bizim istedgimz bir durum degildir...Biz iste bu problemi cozmek icin worker lari kullanacagiz
//Worker in kendine ait bir thread i vardir, kendi icinde takilir...Biziim burdaki javascript icindeki kodlardan veya thread lerden(islemlerden) bagimsizdir
//Workers kendi ayri bir dunyasi var kendine ait thread i ile ilgiili islemi baslatiyor sonlandiriyor ve bize bunlari haber veriyor...ve hicbir diger javascript kodlarindan kendi thread i etkilenmiyor...onlara takilmiyor..worker sayesinde de biz hicbirseye takilmadan alert e tiklayinca alertimiz hic bir sorun yasamdan calisacaktir...