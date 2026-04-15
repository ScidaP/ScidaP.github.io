import { createRoot } from 'react-dom/client'
import { DeleteAccountApp } from './DeleteAccountApp'
import { getDeleteAccountAppConfig } from './appConfigs'
import './styles.css'

const rootElement = document.getElementById('root')
const appKey = rootElement?.dataset?.app || ''
const config = getDeleteAccountAppConfig(appKey)

createRoot(rootElement).render(<DeleteAccountApp config={config} />)
