package com.example.beltagy

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.example.beltagy.theme.BeltagyTheme

class MainActivity : ComponentActivity() {
    private var webView: WebView? = null

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        // Handle back button: go back in WebView history instead of closing app
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                val wv = webView
                if (wv != null && wv.canGoBack()) {
                    wv.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })

        setContent {
            BeltagyTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AndroidView(
                        factory = { context ->
                            WebView(context).apply {
                                webView = this
                                settings.javaScriptEnabled = true
                                settings.domStorageEnabled = true
                                settings.allowFileAccess = false
                                settings.allowContentAccess = false
                                settings.cacheMode = WebSettings.LOAD_NO_CACHE
                                settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                                
                                // Disable Android's auto-dark mode so our CSS handles it perfectly
                                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
                                    settings.forceDark = WebSettings.FORCE_DARK_OFF
                                }

                                webViewClient = object : WebViewClient() {
                                    override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                                        if (url != null) {
                                            if ((url.startsWith("http://") || url.startsWith("https://")) && !url.contains("beltagy-mohamed.github.io")) {
                                                val intent = android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url))
                                                context.startActivity(intent)
                                                return true
                                            } else if (url.startsWith("mailto:")) {
                                                val intent = android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url))
                                                context.startActivity(intent)
                                                return true
                                            }
                                        }
                                        return false
                                    }

                                    override fun shouldInterceptRequest(
                                        view: WebView?,
                                        request: android.webkit.WebResourceRequest?
                                    ): android.webkit.WebResourceResponse? {
                                        val url = request?.url?.toString() ?: return null
                                        val baseUrl = "https://beltagy-mohamed.github.io/Beltagy-poetry-website/"
                                        
                                        if (url.startsWith(baseUrl)) {
                                            var path = url.substring(baseUrl.length)
                                            // Remove query params or hash
                                            path = path.substringBefore("?").substringBefore("#")
                                            
                                            if (path.isEmpty() || path.endsWith("/")) {
                                                path += "index.html"
                                            }
                                            
                                            try {
                                                var mimeType = "text/plain"
                                                if (path.endsWith(".html")) mimeType = "text/html"
                                                else if (path.endsWith(".css")) mimeType = "text/css"
                                                else if (path.endsWith(".js")) mimeType = "application/javascript"
                                                else if (path.endsWith(".png")) mimeType = "image/png"
                                                else if (path.endsWith(".jpg") || path.endsWith(".jpeg")) mimeType = "image/jpeg"
                                                else if (path.endsWith(".gif")) mimeType = "image/gif"
                                                else if (path.endsWith(".svg")) mimeType = "image/svg+xml"
                                                else if (path.endsWith(".json")) mimeType = "application/json"
                                                else if (path.endsWith(".woff2")) mimeType = "font/woff2"
                                                else if (path.endsWith(".woff")) mimeType = "font/woff"
                                                
                                                val inputStream = context.assets.open(path)
                                                return android.webkit.WebResourceResponse(mimeType, "UTF-8", inputStream)
                                            } catch (e: Exception) {
                                                // File not found in assets, let it try network or fail gracefully
                                            }
                                        }
                                        return super.shouldInterceptRequest(view, request)
                                    }

                                    override fun onReceivedError(
                                        view: WebView?,
                                        request: android.webkit.WebResourceRequest?,
                                        error: android.webkit.WebResourceError?
                                    ) {
                                        super.onReceivedError(view, request, error)
                                        // We intercept requests, so errors usually mean file not found locally or network down.
                                    }
                                }
                                loadUrl("https://beltagy-mohamed.github.io/Beltagy-poetry-website/")
                            }
                        },
                        update = {}
                    )
                }
            }
        }
    }
}
