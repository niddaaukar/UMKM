$(document).ready(function () {
  $(".card, .btn-square, .imgtentangkami").hover(
    function () {
      // Ketika mouse diarahkan ke gambar dan card
      $(this).addClass("zoomed"); // Tambahkan class zoomed
    },
    function () {
      // Ketika mouse keluar dari gambar dan card
      $(this).removeClass("zoomed"); // Hapus class zoomed
    }
  );

  // Fungsi untuk memeriksa apakah elemen berada dalam viewport saat digulir
  function isElementInViewport(el) {
    // Parameter merupakan elemen HTML yang ingin diperiksa apakah berada dalam viewport atau tidak.
    var rect = el.getBoundingClientRect(); // mendapatkan koordinat relatif elemen terhadap viewport menggunakan metode getBoundingClientRect(). Metode ini mengembalikan objek DOMRect yang berisi informasi tentang ukuran dan posisi relatif dari elemen terhadap viewport.
    return (
      //  mengembalikan hasil dari pengecekan apakah elemen berada dalam viewport atau tidak.
      rect.top >= 0 && // memastikan bahwa bagian atas elemen berada di atas atau setidaknya di bagian atas viewport.
      rect.left >= 0 && // memastikan bahwa bagian kiri elemen berada di sebelah kiri atau setidaknya di bagian kiri viewport.
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && // memastikan bahwa bagian bawah elemen berada di bawah atau setidaknya di bagian bawah viewport.
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) // memastikan bahwa bagian kanan elemen berada di sebelah kanan atau setidaknya di bagian kanan viewport.
    );
  }

  // Fungsi untuk memeriksa setiap elemen <p> saat digulir
  function checkFadeIn() {
    // memeriksa apakah elemen-elemen tertentu telah masuk ke dalam viewport dan memberikan efek fadeIn kepada elemen-elemen tersebut.
    $("p, h1, h2, h3, h4, h5, form, iframe, a").each(function () {
      // pilih elemen apa saja dan mengulangi setiap elemen yang dipilih
      if (isElementInViewport(this)) {
        //memeriksa apakah elemen saat ini berada dalam viewport
        $(this).css("opacity", "1"); // Efek fadeIn saat elemen masuk dalam viewport
      }
    });
  }

  // Panggil fungsi saat halaman dimuat dan saat digulir
  $(window).on("load scroll", checkFadeIn);
});

// API Email
function isValidEmail(email) {
  //regular ekspresi untuk mengambil validasi email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//button kirim
function SendMail() {
  //deklarasi variable
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var subjek = document.getElementById("subjek").value;
  var pesan = document.getElementById("pesan").value;

  // kondisi validasi input
  if (username && email && subjek && pesan && isValidEmail(email)) {
    var params = {
      username: username,
      email: email,
      subjek: subjek,
      pesan: pesan,
    };
    emailjs.send("service_39ypiqi", "template_fl0vfit", params).then(function (response) {
      console.log("Email terkirim:", response);
      document.getElementById("modalMessage").innerText = "Pesan Anda telah berhasil dikirim!";
      var myModal = new bootstrap.Modal(document.getElementById("myModal"));
      //tampilkan modal plugin
      myModal.show();
      // Setel nilai input menjadi string kosong
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subjek").value = "";
      document.getElementById("pesan").value = "";
    });
  } else {
    // Jika ada input yang tidak diisi atau email tidak valid, tampilkan pesan kesalahan pada modalMessage
    if (!username || !email || !subjek || !pesan) {
      document.getElementById("modalMessage").innerText = "Semua kolom harus diisi.";
    } else if (!isValidEmail(email)) {
      document.getElementById("modalMessage").innerText = "Alamat email tidak valid. Silakan coba lagi.";
    } else {
      document.getElementById("modalMessage").innerText = "Semua kolom harus diisi.";
    }
    //tampilkan modal plugin
    var myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();
  }
}
