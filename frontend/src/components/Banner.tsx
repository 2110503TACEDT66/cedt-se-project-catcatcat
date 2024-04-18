import styles from './banner.module.css'
import Image from 'next/image'

export default function Banner() {

  return (
    <div className={styles.banner}>
    <div className={styles.section}>
      <section className={styles.eachsection}>
          <Image className={styles.img} alt='img' src="/img/cws1.jpg" width={2400} height={1600}/>
      </section>
      <section className={styles.eachsection}>
          <Image className={styles.img} alt='img' src="/img/cws2.jpg" width={2400} height={1600} />
      </section>
      <section className={styles.eachsection}>
          <Image className={styles.img} alt='img' src="/img/cws3.jpg" width={2400} height={1600} />
      </section>
      <section className={styles.eachsection}>
          <Image className={styles.img} alt='img' src="/img/cws4.jpg" width={2400} height={1600} />
      </section>
      <section className={styles.eachsection}>
          <Image className={styles.img} alt='img' src="/img/cws5.jpg" width={2400} height={1600} />
      </section>
      <section className={styles.eachsection}>
          <Image className={styles.img} alt='img' src="/img/cws6.jpg" width={2400} height={1600} />
      </section>
    </div>
    </div>
  )
}