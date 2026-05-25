/**
 * Unified Screenshot Capture Utility
 * Captures an element as an image while preserving styles, shadows, and fonts.
 * Optimized for maximum compatibility and reliability using Blob-based downloads.
 */

window.downloadAsImage = async function (selectorOrEl, filename, button) {
    console.log("Download initiation started for:", selectorOrEl);
    let element = (selectorOrEl instanceof HTMLElement) ? selectorOrEl : (document.getElementById(selectorOrEl) || document.querySelector(selectorOrEl));

    // Support jQuery-style selectors with #
    if (!element && typeof selectorOrEl === 'string' && selectorOrEl.startsWith('#')) {
        element = document.getElementById(selectorOrEl.substring(1));
    }

    if (!element) {
        console.error("Critical: Element not found for capture:", selectorOrEl);
        alert("خطأ: لم يتم العثور على العنصر المراد تصويره.");
        return;
    }

    // UI Feedback
    let originalContent = "";
    if (button) {
        originalContent = button.innerHTML;
        button.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i>';
        if (window.lucide) lucide.createIcons();
        button.disabled = true;
    }

    const captureClass = 'capture-target-active';
    element.classList.add(captureClass);

    try {
        // Wait for fonts to be ready
        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }
        // Small delay to ensure all dynamic styles/AOS are finished
        await new Promise(resolve => setTimeout(resolve, 800));

        const canvas = await html2canvas(element, {
            scale: 4, // Ultra HD Quality
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#1A0D16", // Force velvet background
            logging: true,
            windowWidth: 1200, // Force desktop width for horizontal layout (صدر وعجز)
            onclone: function (clonedDoc) {
                // Manually inject royal colors into the cloned document's root
                const root = clonedDoc.documentElement;
                root.style.setProperty('--gold-antique', '#C5A059');
                root.style.setProperty('--velvet-base', '#1A0D16');

                const clonedEl = clonedDoc.querySelector('.' + captureClass);
                if (clonedEl) {
                    clonedEl.style.background = "#1A0D16"; 
                    clonedEl.style.borderRadius = "20px";
                    clonedEl.style.boxShadow = "none"; 
                    
                    clonedEl.style.transform = 'none';
                    clonedEl.style.margin = '0 auto';
                    clonedEl.style.padding = '60px 40px'; 
                    clonedEl.style.opacity = '1';
                    clonedEl.style.visibility = 'visible';
                    clonedEl.style.display = 'block';
                    clonedEl.style.width = '1000px';

                    // Deep force visibility and fix Arabic alignment in screenshots
                    const target = clonedDoc.getElementById('poem-export');
                    if (target) {
                        const container = target.querySelector('#poem-container');
                        if (container) {
                            container.style.paddingBottom = '180px'; // Give ample space for the seal so it doesn't overlap text
                        }

                        // Removed redundant star generation logic; html2canvas handles the pseudo-element natively.

                        target.querySelectorAll('*').forEach(el => {
                            el.style.opacity = '1';
                            el.style.visibility = 'visible';
                            el.style.transform = 'none';
                            el.style.animation = 'none';
                            el.style.transition = 'none';
                            
                            // FORCE GOLD - KILL COLRv1 Palettes
                            el.style.color = '#C5A059';
                            el.style.fill = '#C5A059';
                            el.style.setProperty('color', '#C5A059', 'important');
                            el.style.webkitTextFillColor = "#C5A059";
                            el.style.fontPalette = "none";
                            el.style.setProperty('font-palette', 'none', 'important');
                            el.style.fontFamily = "'Aref Ruqaa Ink', serif";
                        });

                        // Center align text in screenshot to avoid justify distortion in html2canvas
                        target.querySelectorAll('td, p').forEach(el => {
                            el.style.textAlign = "center";
                            el.style.textAlignLast = "center";
                            el.style.letterSpacing = "0px";
                            el.style.color = '#C5A059';
                            el.style.webkitTextFillColor = "#C5A059";
                        });
                    }

                    // Force Wax Seal Black in screenshots
                    clonedEl.querySelectorAll('.wax-seal-unified span').forEach(span => {
                        span.style.color = '#000000';
                        span.style.setProperty('color', '#000000', 'important');
                        span.style.webkitTextFillColor = "#000000";
                    });

                    // Hide unwanted elements
                    clonedEl.querySelectorAll('button, .card-action-btn, a, .flex.gap-5, .no-capture, audio, .no-screenshot, .no-print').forEach(btn => {
                        btn.style.setProperty('display', 'none', 'important');
                    });
                }
            }
        });

        // Use toBlob for better reliability across browsers
        canvas.toBlob(function (blob) {
            if (!blob) {
                console.error("Canvas toBlob failed");
                alert("تعذر إنشاء ملف الصورة، يرجى المحاولة مرة أخرى.");
                return;
            }
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = (filename || 'download') + '.png';

            // Append to body to ensure it works in Firefox
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            URL.revokeObjectURL(url);
            console.log("Download completed successfully:", filename);
        }, 'image/png', 1.0);

    } catch (error) {
        console.error("Capture Error Detailed:", error);
        alert("حدث خطأ أثناء التصوير الرقمي، يرجى مراجعة نافذة المتصفح.");
    } finally {
        element.classList.remove(captureClass);
        if (button) {
            button.innerHTML = originalContent;
            button.disabled = false;
            if (window.lucide) lucide.createIcons();
        }
    }
};
