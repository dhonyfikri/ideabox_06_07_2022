import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from '../style/TermCondi.style';
import style from './../../../config/Style/style.cfg';
const TermCondi = ({navigation}) => {
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
            navigation.navigate('PrivacyPolicy');
          }}>
          <Text style={[style.h4, {color: '#FFFFFF'}]}>Accept</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 15}}>
        <Text style={style.h2}>
          {'\n'}Term & Conditions{'\n'}
        </Text>
        <Text style={style.h5}>
          PT. Telkom Corporate University (“kami”) berkomitmen untuk menjaga
          kerahasiaan dan keamanan informasi pribadi Anda. Kami membuat
          kebijakan Privasi ini agar Anda memahami cara kami mengumpulkan,
          menggunakan, dan membagikan data tentang Anda.
          {'\n'}
          {'\n'}
          Harap membaca Syarat dan Ketentuan ini secara seksama sebelum Anda
          mulai menggunakan Platform Kami, karena peraturan ini berlaku pada
          penggunaan Anda terhadap Platform Kami.
          {'\n'}
          {'\n'}
          Anda mengerti dan setuju bahwa Syarat dan Ketentuan ini merupakan
          perjanjian dalam bentuk elektronik dan tindakan Anda menekan tombol
          ‘daftar’ saat pembukaan Akun atau tombol ‘masuk’ saat akan mengakses
          Akun Anda merupakan persetujuan aktif Anda untuk mengikatkan diri
          dalam perjanjian dengan Kami sehingga keberlakuan Syarat dan Ketentuan
          ini dan Kebijakan Privasi adalah sah dan mengikat secara hukum dan
          terus berlaku sepanjang penggunaan Platform oleh Anda. Bila Anda tidak
          setuju dengan Syarat dan Ketentuan Penggunaan ini, maka Anda tidak
          diperkenankan menggunakan Platform kami.
          {'\n'}
          {'\n'}
          Kami dapat mengubah Syarat dan Ketentuan ini dari waktu ke waktu,
          perubahan akan diberitahukan kepada Anda melalui email, melalui
          pemberitahuan yang diunggah di Layanan, atau sebagaimana yang
          diwajibkan oleh hukum yang berlaku; dan Anda setuju bahwa Anda
          bertanggung jawab untuk meninjau Syarat dan Ketentuan ini secara
          berkala. Penggunaan secara berkelanjutan oleh Anda atas layanan yang
          diberikan dalam Platform setelah perubahan dan/atau penambahan Syarat
          dan Ketentuan yang berlaku, akan dianggap sebagai persetujuan dan
          penerimaan Anda atas perubahan dan/atau penambahan tersebut. Anda
          dapat menyampaikan keberatan atas perubahan dan/atau penambahan atas
          Syarat dan Ketentuan yang berlaku yang dianggap merugikan Anda secara
          komersial dan material dalam jangka waktu 14 (empat belas) hari
          kalender sejak perubahan dan/atau penambahan tersebut dipublikasikan.
          Kami berhak untuk menghentikan akses Anda terhadap Platform dalam hal
          Anda berkeberatan atas perubahan dan/atau penambahan Syarat dan
          Ketentuan yang berlaku tersebut.
        </Text>
        <Text style={style.h4medium}>1. Akun</Text>
        <Text style={style.h5}>
          Anda harus berusia minimal 18 (delapan belas) tahun atau sudah menikah
          dan tidak berada di bawah perwalian atau pengampuan agar Anda secara
          hukum memiliki kapasitas dan berhak untuk mengikatkan diri pada Syarat
          dan Ketentuan ini. Jika Anda tidak memenuhi ketentuan tersebut, maka
          tindakan Anda mendaftar, mengakses, menggunakan atau melakukan
          aktivitas lain dalam Platform Kami harus dalam sepengetahuan,
          pengawasan dan persetujuan yang sah dari orang tua atau wali atau
          pengampu Anda. Orang tua, wali atau pengampu yang memberikan
          persetujuan bagi Anda yang berusia di bawah 18 (delapan belas) tahun
          bertanggung jawab secara penuh atas seluruh tindakan Anda dalam
          penggunaan dan akses terhadap Platform.
          {'\n'}
          {'\n'}
          Dengan mendaftar dan/atau menggunakan Platform Kami, maka Anda
          dan/atau orang tua, wali atau pengampu Anda (jika Anda berusia di
          bawah 18 tahun) dianggap telah membaca, mengerti, memahami dan
          menyetujui semua isi dalam Syarat dan Ketentuan ini.
          {'\n'}
          {'\n'}
          Sebelum menggunakan Platform, kami meminta Anda untuk menyetujui
          Syarat dan Ketentuan beserta Kebijakan Privasi untuk Anda dapat
          mendaftarkan diri Anda dengan memberikan informasi yang Kami butuhkan.
          Saat melakukan pendaftaran, Kami akan meminta Anda untuk memberikan
          akses akun google, nama lengkap, gambar profil, jenis kelamin dan
          alamat surat elektronik Anda. Kami juga dapat menghentikan penggunaan
          Platform jika dikemudian hari data-data yang Anda berikan kepada Kami
          terbukti tidak benar.
          {'\n'}
          {'\n'}
          Keamanan dan kerahasiaan akun Anda, termasuk namun tidak terbatas pada
          seluruh data pribadi yang Anda berikan kepada kami melalui formulir
          pendaftaran pada Platform kami, sepenuhnya merupakan tanggung jawab
          pribadi Anda. Segala kerugian dan risiko yang timbul akibat atau
          sehubungan dengan kelalaian Anda dalam menjaga keamanan dan
          kerahasiaan akun Anda ditanggung oleh Anda sendiri dan/atau orang tua,
          wali atau pengampu Anda (bagi Pengguna yang berada di bawah Usia
          Dewasa). Dengan demikian, kami akan menganggap setiap penggunaan atau
          pesanan yang dilakukan melalui akun Anda sebagai permintaan yang sah
          dari Anda.
        </Text>
        <Text style={style.h4medium}>2. Layanan dan Biaya</Text>
        <Text style={style.h5}>
          Anda mengakui bahwa kelas tertentu dari Platform kami mungkin tidak
          tersedia untuk Anda kecuali Anda mengikuti kelas premium atau paket
          berlangganan (paket subscribe) yang tersedia pada Platform kami, yang
          sekarang dikenakan biaya berlangganan. Anda setuju dan mengakui bahwa
          setiap ketentuan yang disampaikan kepada Anda pada saat proses
          menggunakan atau berlangganan pada Platform kami dianggap sebagai
          bagian dari Ketentuan Penggunaan ini.
          {'\n'}
          {'\n'}
          Akses Anda terhadap kelas premium atau paket berlangganan (paket
          subscribe) yang tersedia pada Platform kami hanya akan aktif setelah
          Anda mengisi dan menyampaikan seluruh data dan dokumen wajib yang
          diperlukan dan menyelesaikan seluruh pembayaran biaya kelas atau paket
          secara tepat waktu. Anda setuju untuk membayar biaya kelas atau paket
          yang berlaku tanpa pengurangan atau pemotongan pajak. Jika pengurangan
          atau pemotongan pajak adalah wajib, Anda akan bertanggung jawab untuk
          membayarkan jumlah tambahan sebagaimana diperlukan agar kami menerima
          pembayaran penuh dari biaya paket yang berlaku. Anda memahami bahwa PT
          Angga Membangun Indonesia dari waktu ke waktu dapat mengubah harga
          atau memberikan uji coba dan penawaran khusus yang dapat mengakibatkan
          jumlah yang dikenakan kepada Pengguna tertentu menjadi berbeda.
        </Text>
        <Text style={style.h4medium}>3. Penggunaan yang Dilarang</Text>
        <Text style={style.h5}>
          Anda hanya diperbolehkan menggunakan Platform kami untuk tujuan-tujuan
          yang sah menurut hukum. Anda dilarang keras untuk menggunakan Platform
          Kami:
          {'\n'}
          1.Dengan cara-cara yang melanggar hukum dan peraturan lokal, nasional,
          maupun internasional yang berlaku.
          {'\n'}
          2. Dengan cara-cara yang melanggar hukum atau menipu, atau memiliki
          tujuan atau dampak yang melanggar hukum atau menipu.
          {'\n'}
          3. Untuk tujuan membahayakan atau mencoba mencelakakan anak di bawah
          umur dengan cara apa pun.
          {'\n'}
          4. Menyebarkan atau mengirimkan materi iklan atau promosi yang tidak
          diinginkan atau tidak sah, serta bentuk permintaan serupa lainnya
          (seperti spam).
          {'\n'}
          5. Dengan sengaja meneruskan data, mengirim atau mengunggah materi
          yang mengandung virus, trojan, worm, logic bomb, keystroke loggers,
          spyware, adware, maupun program berbahaya lainnya atau kode komputer
          sejenis yang dirancang untuk memberikan efek merugikan terhadap
          pengoperasian perangkat lunak atau perangkat keras apa pun.
          {'\n'}
          Anda juga setuju:
          {'\n'}
          1.Untuk tidak mengirim, menerima, mengunggah, mengunduh, mereproduksi,
          menggandakan, menyalin, menggunakan atau memperjualbelikan materi,
          konten atau bagian mana pun dari Platform Kami yang bertentangan
          dengan ketentuan dalam Syarat dan Ketentuan Platform Kami.
          {'\n'}
          2. Untuk tidak mengakses tanpa izin, mengganggu, merusak, atau
          mengacak-acak:
          {'\n'}
          1.bagian mana pun dari Platform Kami;
          {'\n'}
          2. peralatan atau jaringan di mana Platform Kami tersimpan;
          {'\n'}
          3. perangkat lunak apa pun yang digunakan dalam penyediaan Platform
          Kami; atau
          {'\n'}
          4. peralatan atau jaringan atau perangkat lunak yang dimiliki oleh
          pihak ketiga mana pun.
          {'\n'}
          Apabila Anda adalah seorang pegawai negeri atau penyelenggara negara,
          dalam menggunakan Platform Kami, Anda setuju untuk mematuhi ketentuan
          peraturan perundang-undangan khususnya yang mengatur tentang
          penerimaan gratifikasi serta ketentuan lain yang berlaku di lingkungan
          lembaga anda.
          {'\n'}
          {'\n'}
          Apabila Anda adalah seorang pendidik atau tenaga kependidikan, dalam
          menggunakan Platform Kami, anda setuju untuk mematuhi ketentuan
          peraturan perundang-undangan terkait pengelolaan dan penyelenggaraan
          pendidikan, terutama terkait kegiatan sosialisasi, pemasaran,
          distribusi, maupun penjualan program/produk dari Platform Kami kepada
          peserta didik di satuan pendidikan formal dimana Anda mengajar atau
          bekerja dengan suatu imbalan dalam bentuk apa pun.
        </Text>
        <Text style={style.h4medium}> 4. Hak Kekayaan Intelektual</Text>
        <Text style={style.h5}>
          Anda mengakui dan menyetujui bahwa Layanan termasuk namun tidak
          terbatas kepada Konten Digital atau konten lain yang disediakan dalam
          atau melalui Layanan, mengandung informasi dan materi hak milik dan
          dilindungi oleh hak atas kekayaan intelektual atau hukum lainnya yang
          berlaku termasuk namun tidak terbatas kepada hak cipta. Anda
          menyetujui bahwa Anda tidak akan menggunakan informasi dan materi hak
          milik tersebut dengan cara apa pun selain untuk menggunakan Layanan
          sesuai dengan Perjanjian ini. Anda menyetujui untuk tidak mengubah,
          menyewakan, meminjamkan, menjual, mendistribusikan atau menciptakan
          karya-karya derivatif berdasarkan Layanan baik keseluruhan maupun
          sebagian dengan cara apa pun. Anda menyetujui untuk tidak menyalin,
          mempublikasikan, membuat ulang atau menyiarkan Layanan dalam bentuk
          apa pun dengan cara apa pun, kecuali secara tegas diizinkan dalam
          Perjanjian ini.
          {'\n'}
          {'\n'}
          Anda menyetujui bahwa Anda telah diberitahukan secara patut mengenai
          setiap merek dagang, bentuk dagang, merek jasa, hak cipta, paten atau
          hak atas kekayaan intelektual atau hak kepemilikan lainnya dalam sifat
          apa pun dan setiap pelanggaran Anda terhadap setiap hak kepemilikan
          tersebut dianggap dengan wajar sebagai suatu kesengajaan.
          {'\n'}
          {'\n'}
          Kami meminta pihak-pihak lain untuk menghormati hak atas kekayaan
          intelektual kami, dan kami menghormati hak atas kekayaan intelektual
          pihak-pihak lain. Jika Anda berpendapat bahwa materi-materi yang kami
          cantumkan melanggar hak cipta Anda, Anda dianjurkan untuk memberitahu
          kami sesuai dengan kebijakan pelanggaran hak cipta kami.
          {'\n'}
          {'\n'}
          Jika seorang pengguna melanggar atau berkali-kali melanggar hak atas
          kekayaan intelektual kami atau pihak lain, kami dapat, dalam diskresi
          kami, mengakhiri atau menolak akses terhadap dan penggunaan Layanan.
          Dalam hal ini, kami tidak memiliki kewajiban untuk memberikan suatu
          pengembalian terhadap jumlah apa pun yang telah dibayarkan kepada kami
          sebelumnya.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>5. Tindakan yang Kami Anggap Perlu</Text>
        <Text style={style.h5}>
          Apabila Kami mengetahui atau mempunyai alasan yang cukup untuk menduga
          bahwa Anda telah melakukan tindakan asusila, pelanggaran, kejahatan
          atau tindakan lain yang bertentangan dengan Syarat dan Ketentuan ini
          dan/atau peraturan perundang-undangan yang berlaku, baik yang dirujuk
          dalam Syarat dan Ketentuan ini atau tidak, maka Kami berhak untuk dan
          dapat membekukan Akun, baik sementara atau permanen, atau menghentikan
          akses Anda terhadap Platform, melakukan pemeriksaan, menuntut ganti
          kerugian, melaporkan kepada pihak berwenang dan/atau mengambil
          tindakan lain yang kami anggap perlu, termasuk tindakan hukum pidana
          maupun perdata.
          {'\n'}
          {'\n'}
          Kami akan menindaklanjuti dengan melakukan investigasi dan/atau
          memfasilitasi Penyedia Layanan yang bersangkutan untuk melaporkan
          kepada pihak yang berwajib apabila Kami menerima Laporan adanya
          pelanggaran yang Anda lakukan atas Syarat dan Ketentuan ini ataupun
          pelanggaran terhadap peraturan perundang-undangan yang berlaku,
          sehubungan dengan pelecehan atau kekerasan verbal, termasuk namun
          tidak terbatas pada, atas fisik, jenis kelamin, suku, agama dan ras.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>6. Link ke Platform Kami</Text>
        <Text style={style.h5}>
          - Anda dapat membuat link ke Platform Kami, asalkan Anda melakukannya
          dengan cara yang adil dan legal serta tidak merusak reputasi Kami atau
          mengambil keuntungan darinya.
          {'\n'}- Anda tidak diperbolehkan membuat link sedemikian rupa sehingga
          memberi kesan adanya suatu asosiasi, persetujuan, ataupun dukungan
          dari Kami ketika hal tersebut tidak benar adanya.
          {'\n'}- Anda tidak diperbolehkan membuat link ke Platform Kami pada
          situs web mana pun yang tidak dimiliki oleh Anda.
          {'\n'}- Kami berhak mencabut izin pembuatan link tanpa pemberitahuan.
          {'\n'}- Situs web yang Anda berikan link harus mematuhi segala aspek
          standar konten yang telah ditetapkan melalui Syarat dan Ketentuan
          Kami.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>7. Tautan kepada Situs Pihak Ketiga</Text>
        <Text style={style.h5}>
          Kami dapat menyediakan tautan untuk situs pihak ketiga; namun, kami
          tidak bertanggung jawab mengenai isi dari situs tersebut atau
          ketentuan penggunaannya atau kebijakan privasinya. Mohon berhati-hati
          membaca ketentuan layanan dan kebijakan privasi dari semua situs
          tersebut sebelum anda menggunakannya. Anda menanggung risiko dari
          setiap penggunaan situs pihak ketiga tersebut.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>8. Kebijakan Privasi</Text>
        <Text style={style.h5}>
          Kami berkomitmen untuk menjaga keamanan dan kerahasiaan data pribadi
          yang diberikan Pengguna saat mengakses dan menggunakan Platform (“Data
          Pribadi”). Dalam hal ini, Data Pribadi diberikan oleh Pengguna secara
          sadar dan tanpa adanya tekanan atau paksaan dari pihak manapun, serta
          ikut bertanggung jawab penuh dalam menjaga kerahasiaan Data Pribadi
          tersebut. Untuk informasi mengenai praktik perlindungan data kami,
          silakan lihat Kebijakan Privasi kami dalam Privacy Policy
          {'\n'}
          {'\n'}
          Anda dengan ini menyatakan bahwa Anda telah membaca dan memahami
          secara penuh konten dan sebab-akibat dari Kebijakan Privasi kami, dan
          Anda tidak dapat secara paksa mencabut kembali persetujuan Anda yang
          telah terikat dengan ketentuan-ketentuan dari Kebijakan Privasi kami.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>9. Keadaan Kahar</Text>
        <Text style={style.h5}>
          Kami dapat diinterupsi oleh kejadian di luar kewenangan atau kontrol
          kami, termasuk namun tidak terbatas pada bencana alam, gangguan
          listrik, gangguan telekomunikasi, kebijakan pemerintah, dan lain-lain
          (“Keadaan Kahar”). Anda setuju untuk membebaskan dan melepaskan PT
          Angga Membangun Indonesia dari setiap klaim dan tuntutan, jika kami
          tidak dapat memfasilitasi akses dan/atau penggunaan Platform, baik
          sebagian maupun seluruhnya, karena suatu Keadaan Kahar.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>10. Tanggung Jawab Anda</Text>
        <Text style={style.h5}>
          Anda bertanggung jawab secara penuh atas setiap kerugian dan/atau
          klaim yang timbul dari penggunaan Platform melalui akun Anda, baik
          oleh Anda atau pihak lain yang menggunakan akun Anda, dengan cara yang
          bertentangan dengan Ketentuan Penggunaan ini, peraturan
          perundang-undangan yang berlaku, pelanggaran hak kekayaan intelektual
          dan/atau aktivitas lain yang merugikan publik dan/atau pihak lain
          manapun atau yang dapat atau dianggap dapat merusak reputasi kami.
          {'\n'}
          {'\n'}
          Kami tidak menjamin bahwa Platform akan aman atau terbebas dari bug
          atau virus. Anda bertanggung jawab untuk mengatur teknologi informasi,
          program komputer, serta platform yang Anda gunakan untuk mengakses
          Platform kami. Anda harus menggunakan perangkat lunak anti-virus Anda
          sendiri.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>11. Batasan Tanggung Jawab Kami</Text>
        <Text style={style.h5}>
          Platform yang Kami sediakan adalah sebagaimana adanya dan Kami tidak
          menyatakan atau menjamin bahwa keandalan, ketepatan waktu, kualitas,
          kesesuaian, ketersediaan, akurasi, kelengkapan atau keamanan dari
          Platform dapat memenuhi kebutuhan dan akan sesuai dengan harapan Anda.
          {'\n'}
          {'\n'}
          Kami tidak bertanggung jawab kepada pengguna mana pun atas kerugian
          atau kerusakan, baik dalam bentuk kontrak, perbuatan melawan hukum
          (termasuk kelalaian), pelanggaran kewajiban berdasarkan undang-undang,
          atau sebaliknya, meskipun dapat diperkirakan, yang terjadi di bawah
          atau berhubungan dengan:
          {'\n'}
          1.Penggunaan, atau ketidakmampuan untuk menggunakan, Platform Kami;
          atau
          {'\n'}
          2. Penggunaan atau kepercayaan terhadap konten apa pun yang
          ditampilkan pada Platform Kami.
          {'\n'}
          Kami hanya menyediakan Platform untuk penggunaan domestik dan pribadi.
          Anda setuju untuk tidak menggunakan Platform Kami untuk tujuan
          komersial atau bisnis apa pun, dan Kami tidak bertanggung jawab kepada
          Anda atas kerugian, kehilangan usaha, gangguan usaha, maupun hilangnya
          kesempatan bisnis.
          {'\n'}
          {'\n'}
          Kami tidak bertanggung jawab atas kerugian atau kerusakan yang
          disebabkan oleh virus, serangan Penolakan Layanan secara Terdistribusi
          (DDoS), maupun materi teknologi berbahaya lainnya yang dapat
          menginfeksi peralatan komputer, program komputer, data, atau materi
          kepemilikan lainnya karena penggunaan maupun pengunduhan konten apa
          pun dari Platform Kami maupun situs web lain yang terkait dengannya
          oleh Anda.
          {'\n'}
          {'\n'}
          Dengan menggunakan dan mengakses Platform kami, Anda setuju bahwa
          setiap jawaban, informasi, materi dan konten yang ditampilkan pada
          Platform telah sesuai dengan pengetahuan dan maksud terbaik kami, dan
          Anda setuju untuk memverifikasi secara independen keaslian dan
          kebenaran jawaban, informasi, materi dan konten yang diterbitkan
          tersebut. Setiap tindakan yang Anda ambil atas dasar informasi yang
          terdapat di Platform adalah tanggung jawab dan risiko Anda sendiri dan
          kami tidak bertanggung jawab atas konsekuensi tindakan yang Anda
          lakukan.
          {'\n'}
        </Text>
        <Text style={style.h4medium}>12. Hukum yang berlaku</Text>
        <Text style={style.h5}>
          Syarat dan Ketentuan ini diatur berdasarkan hukum Republik Indonesia.
          Setiap dan seluruh perselisihan yang timbul dari penggunaan Platform
          tunduk pada yurisdiksi eksklusif Pengadilan Negeri Jakarta Pusat.
          {'\n'}
        </Text>
        <View style={{height: 100}}></View>
      </ScrollView>
    </View>
  );
};

export default TermCondi;
