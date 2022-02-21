import { useState, useRef } from 'react';
import styles from './styles.module.css';
import { NoticePortal } from 'components';

export const App = () => {
  const noticeRef = useRef();
  const [text, setText] = useState('');
  const [mode, setMode] = useState('info');
  const [autoClose, setAutoClose] = useState(false);

  const addNotice = () => {
    noticeRef.current.addMessage({ mode, message: text });
  };

  return (
    <div className={styles.main}>
      <h1>Teste de Notificações</h1>
      <div className={styles.content}>
        <img alt="notice" src="/assets/email.png" />
        <form
          onSubmit={e => {
            e.preventDefault();
            if (text) {
              addNotice();
              setText('');
            }
          }}
        >
          <div className={styles.autoClose}>
            <input
              type="checkbox"
              value={autoClose}
              onChange={e => setAutoClose(e.target.checked)}
            />
            <label>Fechamento automático</label>
          </div>

          <select value={mode} onChange={e => setMode(e.target.value)}>
            <option value="info">Informações</option>
            <option value="success">Sucesso</option>
            <option value="warning">Alerta</option>
            <option value="error">Erro</option>
          </select>

          <input
            type="text"
            value={text}
            placeholder="Teste sua notificação"
            onChange={e => setText(e.target.value)}
          />

          <button>Enviar</button>
        </form>
      </div>

      <NoticePortal ref={noticeRef} autoClose={autoClose} />
    </div>
  );
};
