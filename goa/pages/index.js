
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ input })
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 540, margin: '40px auto', padding: 24, textAlign: 'center', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #eee' }}>
      <Head>
        <title>goa! by reklamingo</title>
        <link rel="stylesheet" href="/styles/globals.css" />
      </Head>
      <img src="/goa-logo.png" alt="goa logo" style={{ width: 210, marginBottom: 16 }} />
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          style={{ width: '80%', padding: 12, borderRadius: 8, border: '1px solid #ddd', fontFamily: 'Quicksand', fontSize: 18 }}
          placeholder="Sektörünüzü ya da işinizi yazın..."
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: 12, background: '#003e92' }}>
          {loading ? "Yükleniyor..." : "Ara"}
        </button>
      </form>
      <a href="https://www.reklamingo.com.tr" target="_blank" style={{ display: 'block', marginBottom: 24, fontWeight: 700 }}>reklamingo'ya gidin.</a>
      {result &&
        <div>
          <div style={{ textAlign: 'left', marginBottom: 20 }}>
            <h2>Harika Fikirler</h2>
            <ul>
              {result.ideas.map((idea, i) => <li key={i}>{idea}</li>)}
            </ul>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h2>Reklamingo’dan Size Uygun Ürünler</h2>
            <ul>
              {result.products.map((product, i) => <li key={i}>{product}</li>)}
            </ul>
          </div>
        </div>
      }
    </div>
  )
}
