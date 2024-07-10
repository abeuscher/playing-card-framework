import GameBoard from '@/components/GameBoard'
import ReduxProvider from '@/utils/ReduxProvider'
import styles from './page.module.css'

const HomePage = () => {
  return (
    <main className={styles.main}>
      <h1>Playing Card Framework</h1>
      <GameBoard />
    </main>
  )
}

export default function Home() {
  return (
    <ReduxProvider>
      <HomePage />
    </ReduxProvider>
  )
}
