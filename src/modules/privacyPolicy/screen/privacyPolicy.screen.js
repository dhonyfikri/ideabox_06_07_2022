import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../style/privacyPolicy.style';
import style from './../../../config/Style/style.cfg';

const privacyPolicy = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#FFFFFF'}]}
          onPress={() => navigation.navigate('Login', {checked: false})}>
          <Text style={[style.h4, {color: '#085D7A'}]}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#085D7A'}]}
          onPress={() => {
            navigation.push('Login', {checked: true});
          }}>
          <Text style={[style.h4, {color: '#FFFFFF'}]}>Accept</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 15}}>
        <Text style={style.h2}>
          {'\n'}Privacy Policy{'\n'}
        </Text>
        <Text style={style.h5}>
          PT. Telkom Corporate University (“kami”) berkomitmen untuk menjaga
          kerahasiaan dan keamanan informasi pribadi Anda. Kami membuat
          kebijakan Privasi ini agar Anda memahami cara kami mengumpulkan,
          menggunakan, dan membagikan data tentang Anda.
          {'\n'}
          {'\n'}
          Kebijakan Privasi ini mengatur landasan dasar mengenai bagaimana kami
          menggunakan informasi pribadi yang kami kumpulkan dan/atau Anda
          berikan (“Informasi Pribadi”). Kebijakan Privasi ini berlaku bagi
          seluruh pengguna layanan, kecuali diatur pada kebijakan privasi yang
          terpisah. Mohon membaca kebijakan Privasi kami dengan seksama sehingga
          Anda dapat memahami pendekatan dan cara kami dalam menggunakan
          informasi tersebut.
          {'\n'}
          {'\n'}
          Dengan menggunakan Layanan, Anda menyetujui ketentuan kebijakan
          privasi ini. Anda sebaiknya tidak menggunakan Layanan jika Anda tidak
          menyetujui kebijakan Privasi ini atau perjanjian lainnya yang mengatur
          penggunaan Layanan oleh Anda
          {'\n'}
          {'\n'}
          Kebijakan Privasi ini mencakup hal-hal sebagai berikut:
        </Text>
        <Text style={style.h4medium}>1. Data Apa yang kami dapatkan</Text>
        <Text style={style.h5}>
          Kami mengumpulkan data tertentu dari Anda secara langsung, seperti
          informasi yang Anda masukkan sendiri. Kami juga mengumpulkan sebagian
          data secara otomatis sesuai dengan layanan yang terhubung dengan
          Google Analytics.{'\n'}
          {'\n'}
          a. Data yang Anda Berikan kepada Kami{'\n'}
          {'\n'}
          Kami dapat mengumpulkan berbagai format data dari atau tentang Anda,
          bergantung pada cara Anda menggunakan Layanan. Di bawah ini adalah
          beberapa contoh untuk membantu Anda memahami dengan lebih baik data
          yang kami kumpulkan. Saat Anda membuat akun dan menggunakan Layanan,
          termasuk melalui platform pihak ketiga, kami mengumpulkan setiap data
          yang Anda berikan secara langsung, termasuk:
          {'\n'}
        </Text>
        <Text style={style.h5}>
          - Data Akun
          {'\n'}
          Untuk dapat menggunakan fitur yang ada pada aplikasi Ideabox, Anda
          perlu login menggunakan SSO. Kami akan mengumpulkan dan menyimpan data
          yang Anda berikan, seperti nama lengkap, gambar profil, jenis kelamin,
          bahasa yang dipilih, informasi lain yang dibuat publik dan alamat
          email. {'\n'}
        </Text>
        <Text style={style.h5}>
          - Data Profil
          {'\n'}
          Anda juga dapat memilih untuk menyediakan informasi profil seperti
          foto, nama lengkap, alamat email, nama pengguna (username), role, dan
          beberapa informasi lainnya. Data Profil Anda dapat dilihat secara
          terbuka oleh pihak lain.
          {'\n'}
        </Text>
        <Text style={style.h5}>
          B. Data yang Kami Kumpulkan melalui Cara Otomatis
          {'\n'}
          {'\n'}
          Kami menggunakan layanan Google Analytics yang secara otomatis
          mengumpulkan data tertentu mencakup data sistem, data penggunaan, dan
          perkiraan data geografis.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>2. Untuk Apa Data Anda Digunakan</Text>
        <Text style={style.h5}>
          Kami menggunakan data Anda untuk melakukan hal-hal seperti menyediakan
          Layanan kami, berkomunikasi dengan Anda, memecahkan masalah,
          melindungi dari penipuan dan penyalahgunaan, meningkatkan mutu dan
          memperbarui Layanan kami, menganalisis cara orang menggunakan Layanan
          kami, menyajikan iklan yang dipersonalisasi, dan sebagaimana
          disyaratkan oleh hukum atau diperlukan untuk keamanan dan integritas.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>
          3. Bagaimana Kami Membagikan dan Mengungkapkan Informasi Anda
        </Text>
        <Text style={style.h5}>
          Kami menggunakan data Anda untuk melakukan hal-hal seperti menyediakan
          Layanan kami, berkomunikasi dengan Anda, memecahkan masalah,
          melindungi dari penipuan dan penyalahgunaan, meningkatkan mutu dan
          memperbarui Layanan kami, menganalisis cara orang menggunakan Layanan
          kami, menyajikan iklan yang dipersonalisasi, dan sebagaimana
          disyaratkan oleh hukum atau diperlukan untuk keamanan dan integritas.
          {'\n'}
        </Text>
        <Text style={style.h4medium}> 4. Hak Anda</Text>
        <Text style={style.h5}>
          Anda dapat memohon untuk penghapusan Informasi Pribadi Anda pada
          Platform atau menarik persetujuan Anda untuk setiap atau segala
          pengumpulan, penggunaan atau pengungkapan Informasi Pribadi Anda
          dengan memberikan kepada kami pemberitahuan yang wajar secara tertulis
          melalui detail kontak yang tercantum pada bagian Kebijakan Privasi
          ini. Tergantung pada keadaan dan sifat permohonan yang Anda minta,
          Anda harus memahami dan mengakui bahwa setelah penarikan persetujuan
          atau permohonan penghapusan tersebut, Anda mungkin tidak lagi dapat
          menggunakan Platform. Penarikan persetujuan Anda dapat mengakibatkan
          penghentian Akun Anda atau hubungan kontraktual Anda dengan kami,
          dengan semua hak dan kewajiban yang muncul sepenuhnya harus dipenuhi.
          Setelah menerima pemberitahuan untuk menarik persetujuan untuk
          pengumpulan, penggunaan atau pengungkapan Informasi Pribadi Anda, Kami
          akan menginformasikan Anda tentang konsekuensi yang mungkin terjadi
          dari penarikan tersebut sehingga Anda dapat memutuskan apakah Anda
          tetap ingin menarik persetujuan atau tidak.
          {'\n'}
          {'\n'}
          Anda dapat meminta kepada Kami untuk mengakses dan/atau mengoreksi
          Informasi Pribadi anda yang berada dalam kepemilikan dan penguasaan
          kami, dengan menghubungi kami di perincian yang disediakan di bawah
          ini.
          {'\n'}
          {'\n'}
          Platform Kami dapat, dari waktu ke waktu, memuat link menuju dan dari
          situs-situs milik jaringan mitra, pemuat iklan, dan afiliasi lainnya.
          Jika Anda mengikuti link ke salah satu situs tersebut, mohon
          perhatikan bahwa situs-situs tersebut memiliki Kebijakan Privasi
          mereka sendiri dan bahwa Kami tidak bertanggung jawab atau memiliki
          kewajiban apa pun atas kebijakan-kebijakan tersebut. Mohon periksa
          kebijakan-kebijakan tersebut sebelum Anda menyerahkan informasi apa
          pun ke situs-situs tersebut.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>5. Kebijakan Cookies</Text>
        <Text style={style.h5}>
          Ketika Anda menggunakan Layanan, Kami dapat menempatkan sejumlah
          cookies pada browser Anda. Cookies adalah sebuah berkas digital kecil
          berisi huruf dan angka yang Kami simpan pada browser atau hard drive
          komputer Anda atas persetujuan Anda. Cookies mengandung informasi yang
          dipindahkan ke diska keras komputer Anda.
          {'\n'}
          {'\n'}
          Cookies dapat digunakan untuk tujuan berikut: (1) mengaktifkan fungsi
          tertentu, (2) memberikan analisis, (3) menyimpan preferensi Anda; dan
          (4) memungkinkan pengiriman iklan dan pengiklanan berdasarkan
          perilaku. Beberapa cookies ini hanya akan digunakan jika Anda
          menggunakan fitur tertentu, atau memilih preferensi tertentu,
          sementara sebagian Cookies lain akan selalu digunakan.
          {'\n'}
          {'\n'}
          Kami menggunakan cookies untuk alasan-alasan berikut:
          {'\n'}
          {'\n'}
          Cookies dibutuhkan untuk pengoperasian Platform Kami. Ini termasuk,
          misalnya, Cookies yang memungkinkan Anda memasuki Area yang aman di
          Platform Kami, menggunakan keranjang belanja, ataupun menggunakan
          layanan penagihan eletronik. Cookies memungkinkan Kami untuk mengenali
          dan menghitung jumlah pengunjung serta melihat bagaimana pengunjung
          bergerak di sekitar Platform Kami saat mereka menggunakannya. Ini
          membantu Kami memperbaiki cara kerja Platform Kami, misalnya, dengan
          memastikan pengguna menemukan apa yang mereka cari dengan mudah.
          Cookies digunakan untuk mengenali Anda saat kembali ke Platform Kami.
          Ini memungkinkan Kami melakukan personalisasi terhadap konten Kami
          untuk Anda, menyapa Anda dengan nama, serta mengingat preferensi Anda
          (misalnya, pilihan bahasa atau wilayah Anda). Cookies mencatat
          kunjungan Anda ke Platform Kami, halaman yang telah Anda kunjungi,
          serta tautan yang telah Anda ikuti. Kami akan menggunakan informasi
          ini untuk membuat Platform Kami serta iklan yang terpasang di dalamnya
          lebih relevan kepada minat Anda. Kami juga dapat membagi informasi ini
          dengan pihak ketiga untuk tujuan tersebut. Mohon perhatikan bahwa
          pihak ketiga (termasuk, misalnya, jaringan periklanan dan penyedia
          jasa eksternal seperti jasa analisis lalu lintas web) juga dapat
          menggunakan Cookies ini, di mana Kami tidak memiliki kendali. Cookies
          ini cenderung membuat Platform Kami dan iklan yang ditampilkan di
          dalamnya lebih relevan dengan minat Anda, serta meningkatkan kinerja
          Platform Kami.
          {'\n'}
          {'\n'}
          Anda dapat menghapus Cookies dengan cara melakukan fungsi clear data
          pada mobile app maupun web browser Anda yang memungkinkan Anda untuk
          menolak pengaturan seluruh atau sebagian Cookies. Akan tetapi, Anda
          mungkin tidak dapat mengakses seluruh atau sebagian Platform Kami.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>6. Pengakuan dan Persetujuan</Text>
        <Text style={style.h5}>
          Dengan menyetujui Kebijakan Privasi, Anda dan/atau orang tua, wali
          atau pengampu Anda (dalam hal Anda berusia di bawah 18 (delapan belas)
          tahun) mengakui bahwa Anda telah membaca dan memahami Kebijakan
          Privasi ini dan menyetujui segala ketentuannya. Secara khusus, Anda
          setuju dan memberikan persetujuan kepada kami untuk mengumpulkan,
          menggunakan, membagikan, mengungkapkan, menyimpan, mentransfer, atau
          mengolah Informasi Pribadi anda sesuai dengan Kebijakan Privasi ini.
          {'\n'} {'\n'}
          Dalam hal Anda memberikan Informasi Pribadi yang berkaitan dengan
          individu lain (misalnya Informasi Pribadi yang berkaitan dengan
          pasangan anda, anggota keluarga, teman, atau pihak lain) kepada Kami,
          maka Anda menyatakan dan menjamin bahwa Anda telah memperoleh
          persetujuan dari individu tersebut untuk, dan dengan ini menyetujui
          atas nama individu tersebut untuk, pengumpulan, penggunaan,
          pengungkapan dan pengolahan Informasi Pribadi mereka oleh Kami.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>
          7. Perubahan atas kebijakan Privasi Kami
        </Text>
        <Text style={style.h5}>
          Dari waktu ke waktu, kami dapat memperbarui Kebijakan Privasi ini.
          Jika kami membuat perubahan yang mendasar, kami akan memberi tahu Anda
          melalui email, melalui pemberitahuan yang diunggah di Layanan, atau
          sebagaimana yang diwajibkan oleh hukum yang berlaku. Kami juga akan
          menyertakan ringkasan perubahan utama. Kecuali dinyatakan lain,
          perubahan akan berlaku efektif pada hari pemberitahuan tersebut
          diunggah.
          {'\n'}
          {'\n'}
          Sebagaimana diizinkan oleh hukum yang berlaku, jika Anda terus
          menggunakan Layanan setelah tanggal efektif perubahan apa pun, maka
          akses dan/atau penggunaan Anda akan dianggap sebagai penerimaan (dan
          persetujuan untuk mengikuti dan terikat oleh) Kebijakan Privasi yang
          direvisi. Kebijakan Privasi yang direvisi menggantikan semua Kebijakan
          Privasi sebelumnya.
          {'\n'}
        </Text>
        <View style={{height: 100}}></View>
      </ScrollView>
    </View>
  );
};

export default privacyPolicy;
