import { useState } from 'react'
import './App.css'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
// import { ConfigProvider } from 'antd'
// import { PALETTE } from '@src/constants/palette'
import i18nInitNext from '@src/i18n'
import RouteLayout from './router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18nInitNext}>
          {/* <ConfigProvider
            theme={{
              hashed: false,
              token: {
                colorPrimary: PALETTE.dark_blue_20,
                borderRadius: 8,
                colorBorder: PALETTE.light_gray_57,
                fontFamily: "Lato, sans-serif",
              },
              components: {
                TreeSelect: {
                  fontSize: 16,
                  controlHeight: 44,
                  controlOutline: "none",
                  nodeSelectedBg: PALETTE.alice_blue_50,
                  nodeHoverBg: PALETTE.alice_blue_50,
                },
                Select: {
                  fontSize: 16,
                  controlHeight: 44,
                  controlOutline: "none",
                  optionPadding: "8px",
                  optionHeight: 40,
                  optionLineHeight: "24px",
                  optionSelectedBg: PALETTE.alice_blue_50,
                  optionSelectedFontWeight: 400,
                },
              },
            }}
          > */}
            <RouteLayout />
          {/* </ConfigProvider> */}
        </I18nextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
