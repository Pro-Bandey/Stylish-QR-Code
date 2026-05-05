document.addEventListener("DOMContentLoaded", () => {
    let qrCode = null;
    let uploadedImage = "logos/logo-default.png"; // Start with Default style logo

    // --- Data Base64 Logos for Social/Apps ---
    const presetLogos = {
        default: "logos/logo-default.png",
        facebook: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231877F2'><path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/></svg>",
        whatsapp: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2325D366'><path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z'/></svg>",
        twitter: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000000'><path d='M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'/></svg>",
        youtube: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF0000'><path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/></svg>",
        telegram: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23229ED9'><path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.282-.346-.086l-6.4 4.025-2.76-.86c-.6-.188-.616-.602.126-.893l10.784-4.156c.5-.184.945.105.782 1.011z'/></svg>",
        email: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='%231b661b'><path d='M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z'/></svg>",
        wifi: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='%231b661b'><path d='m109-531-85-85q92-89 210-136.5T480-800q128 0 246 47.5T936-616l-85 85q-75-72-171-110.5T480-680q-104 0-200 38.5T109-531Zm169 169-84-84q59-55 132.5-84.5T480-560q80 0 153.5 29.5T766-446l-84 84q-42-38-93.5-58T480-440q-57 0-108.5 20T278-362Zm145.5 178.5Q400-207 400-240t23.5-56.5Q447-320 480-320t56.5 23.5Q560-273 560-240t-23.5 56.5Q513-160 480-160t-56.5-23.5Z'/></svg>",
        sms: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='%231b661b'><path d='M348.5-531.5Q360-543 360-560t-11.5-28.5Q337-600 320-600t-28.5 11.5Q280-577 280-560t11.5 28.5Q303-520 320-520t28.5-11.5Zm160 0Q520-543 520-560t-11.5-28.5Q497-600 480-600t-28.5 11.5Q440-577 440-560t11.5 28.5Q463-520 480-520t28.5-11.5Zm160 0Q680-543 680-560t-11.5-28.5Q657-600 640-600t-28.5 11.5Q600-577 600-560t11.5 28.5Q623-520 640-520t28.5-11.5ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z'/></svg>",
        vcard: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='%231b661b'><path d='M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z'/></svg>",
        geo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231b661b'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/></svg>",
        bitcoin: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='%23F7931A'><path d='M360-120v-80H240v-80h80v-400h-80v-80h120v-80h80v80h80v-80h80v85q52 14 86 56.5t34 98.5q0 29-10 55.5T682-497q35 21 56.5 57t21.5 80q0 66-47 113t-113 47v80h-80v-80h-80v80h-80Zm40-400h160q33 0 56.5-23.5T640-600q0-33-23.5-56.5T560-680H400v160Zm0 240h200q33 0 56.5-23.5T680-360q0-33-23.5-56.5T600-440H400v160Z'/></svg>",
        calendar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='%231b661b'><path d='M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z'/></svg>",
        instagram: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E1306C'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'/></svg>",
        phone: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231b661b'><path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'/></svg>",
        facetime: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2334C759'><path d='M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z'/></svg>"
    };

    // Helper Functions for DOM UI
    function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val; }
    function setChecked(id, state) { const el = document.getElementById(id); if (el) el.checked = state; }

    // --- UI Setup: Accordions ---
    document.querySelectorAll(".accordion").forEach((acc) => {
        acc.addEventListener("click", function () {
            this.classList.toggle("accordion--open");
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("panel--open");
        });
    });

    // --- UI Setup: Gradient vs Single Color Toggles ---
    function setupColorToggles(prefix) {
        const singleRadio = document.getElementById(`form-${prefix}-color-type-single`);
        const gradientRadio = document.getElementById(`form-${prefix}-color-type-gradient`);
        let classPrefix = prefix === 'corners-square' ? 'cornersSquare' : prefix === 'corners-dot' ? 'cornersDot' : prefix;

        const singleElements = document.querySelectorAll(`.${classPrefix}OptionsHelper\\.colorType\\.single`);
        const gradientElements = document.querySelectorAll(`.${classPrefix}OptionsHelper\\.colorType\\.gradient`);

        function updateVisibility() {
            const isGradient = gradientRadio && gradientRadio.checked;
            singleElements.forEach(el => el.style.display = isGradient ? 'none' : (el.classList.contains('buttons-container') ? 'flex' : 'block'));
            gradientElements.forEach(el => el.style.display = isGradient ? (el.classList.contains('space-between-container') ? 'flex' : 'block') : 'none');
        }

        if (singleRadio) singleRadio.addEventListener('change', updateVisibility);
        if (gradientRadio) gradientRadio.addEventListener('change', updateVisibility);
        updateVisibility();
    }['dots', 'corners-square', 'corners-dot', 'background'].forEach(setupColorToggles);

    // --- Transparent Background Toggle ---
    const bgTransparentCheckbox = document.getElementById('form-bg-transparent');
    bgTransparentCheckbox.addEventListener('change', (e) => {
        const bgSettings = document.querySelectorAll('.bg-color-settings');
        bgSettings.forEach(el => el.style.display = e.target.checked ? 'none' : '');
        updateQRCode();
    });

    // --- Master Theme Applier ---
    function applyStyleTemplate(tmpl, preserveLogo = false) {
        if (!preserveLogo) {
            const styleLogosMap = {
                'classic': 'logos/logo-classic.png',
                'modern': 'logos/logo-default.png',
                'soft': 'logos/logo-soft.png',
                'rounded': 'logos/logo-rounded.png',
                'gradient': 'logos/logo-grad.png',
                'cyberpunk': 'logos/logo-cyberpunk.png',
                'elegant': 'logos/logo-elegant.png',
                'funky': 'logos/logo-funky.png'
            };
            uploadedImage = styleLogosMap[tmpl] || 'logos/logo-default.png';
        }

        // Clean States: Reverting to single colors automatically clears out old gradients!
        setChecked('form-bg-transparent', false);
        bgTransparentCheckbox.dispatchEvent(new Event('change'));['dots', 'corners-square', 'corners-dot', 'background'].forEach(prefix => {
            setChecked(`form-${prefix}-color-type-single`, true);
            document.getElementById(`form-${prefix}-color-type-single`)?.dispatchEvent(new Event('change'));
        });
        
        // Apply Template Configs
        if (tmpl === 'classic') {
            setVal('form-dots-type', 'square'); setVal('form-dots-color', '#000000');
            setVal('form-corners-square-type', 'square'); setVal('form-corners-square-color', '#000000');
            setVal('form-corners-dot-type', 'square'); setVal('form-corners-dot-color', '#000000');
            setVal('form-background-color', '#ffffff');
        } else if (tmpl === 'modern') {
            setVal('form-dots-type', 'extra-rounded'); setVal('form-dots-color', '#1b661b');
            setVal('form-corners-square-type', 'extra-rounded'); setVal('form-corners-square-color', '#1b661b');
            setVal('form-corners-dot-type', 'dot'); setVal('form-corners-dot-color', '#1b661b');
            setVal('form-background-color', '#ffffff');
        } else if (tmpl === 'soft') {
            setVal('form-dots-type', 'rounded'); setVal('form-dots-color', '#4a90e2');
            setVal('form-corners-square-type', 'dot'); setVal('form-corners-square-color', '#4a90e2');
            setVal('form-corners-dot-type', 'dot'); setVal('form-corners-dot-color', '#4a90e2');
            setVal('form-background-color', '#f0f4f8');
        } else if (tmpl === 'rounded') {
            setVal('form-dots-type', 'dots'); setVal('form-dots-color', '#38656a');
            setVal('form-corners-square-type', 'dot'); setVal('form-corners-square-color', '#38656a');
            setVal('form-corners-dot-type', 'dot'); setVal('form-corners-dot-color', '#38656a');
            setVal('form-background-color', '#ffffff');
        } else if (tmpl === 'gradient') {
            setVal('form-dots-type', 'classy'); setChecked('form-dots-color-type-gradient', true);
            setVal('form-dots-color1', '#ff512f'); setVal('form-dots-color2', '#dd2476');
            setVal('form-corners-square-type', 'extra-rounded'); setChecked('form-corners-square-color-type-gradient', true);
            setVal('form-corners-square-color1', '#ff512f'); setVal('form-corners-square-color2', '#dd2476');
            setVal('form-corners-dot-type', 'dot'); setChecked('form-corners-dot-color-type-gradient', true);
            setVal('form-corners-dot-color1', '#ff512f'); setVal('form-corners-dot-color2', '#dd2476');
            setVal('form-background-color', '#ffffff');
        } else if (tmpl === 'cyberpunk') {
            setVal('form-dots-type', 'square'); setChecked('form-dots-color-type-gradient', true);
            setVal('form-dots-color1', '#b400b4'); setVal('form-dots-color2', '#b400b4');
            setVal('form-corners-square-type', 'square'); setChecked('form-corners-square-color-type-gradient', true);
            setVal('form-corners-square-color1', '#00aa88'); setVal('form-corners-square-color2', '#00aa88');
            setVal('form-corners-dot-type', 'square'); setChecked('form-corners-dot-color-type-gradient', true);
            setVal('form-corners-dot-color1', '#b400b4'); setVal('form-corners-dot-color2', '#b400b4');
            setVal('form-background-color', '#ffffff');
        } else if (tmpl === 'elegant') {
            setVal('form-dots-type', 'classy'); setChecked('form-dots-color-type-gradient', true);
            setVal('form-dots-color1', '#d4af37'); setVal('form-dots-color2', '#aa7700');
            setVal('form-corners-square-type', 'extra-rounded'); setVal('form-corners-square-color', '#d4af37');
            setVal('form-corners-dot-type', 'dot'); setVal('form-corners-dot-color', '#d4af37');
            setVal('form-background-color', '#1a1a1a');
        } else if (tmpl === 'funky') {
            setVal('form-dots-type', 'dots'); setChecked('form-dots-color-type-gradient', true);
            setChecked('form-dots-gradient-type-radial', true);
            setVal('form-dots-color1', '#ff5e62'); setVal('form-dots-color2', '#ff5e62');
            setVal('form-corners-square-type', 'extra-rounded'); setVal('form-corners-square-color', '#ff5e62');
            setVal('form-corners-dot-type', 'dot'); setVal('form-corners-dot-color', '#ff5e62');
            setVal('form-background-color', '#ffffff');
        }

        // Fire UI events for activated gradients to reflect visual states
        ['dots', 'corners-square', 'corners-dot', 'background'].forEach(prefix => {
            if (document.getElementById(`form-${prefix}-color-type-gradient`)?.checked) {
                document.getElementById(`form-${prefix}-color-type-gradient`).dispatchEvent(new Event('change'));
            }
        });
    }

    // Connect Style Template Buttons
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tmpl = e.target.getAttribute('data-template');
            
            // Only preserve the logo if the user explicitly set a specific data type (not standard Text).
            const preserveLogo = document.getElementById("data-type").value !== 'text';
            
            applyStyleTemplate(tmpl, preserveLogo);
            updateQRCode();
        });
    });


    // --- Dynamic Data Switching & Auto-Logo Logic ---
    const dataTypeSelect = document.getElementById("data-type");
    const dataGroups = document.querySelectorAll(".data-group");

    dataTypeSelect.addEventListener("change", (e) => {
        const selectedType = e.target.value;
        
        // 1. Toggle input views visibility
        dataGroups.forEach(group => {
            if(group.id === `type-${selectedType}`) group.classList.remove("hide");
            else group.classList.add("hide");
        });

        // 2. Data Logic Rules
        const modernDataTypes =['text', 'wifi', 'vcard', 'phone', 'sms', 'email', 'event', 'geo'];
        const classicColoredTypes = {
            facetime: '#34C759', whatsapp: '#25D366', telegram: '#229ED9',
            instagram: '#E1306C', twitter: '#000000', youtube: '#FF0000', crypto: '#F7931A'
        };

        const typeToLogoMap = {
            wifi: 'wifi', vcard: 'vcard', phone: 'phone', facetime: 'facetime',
            whatsapp: 'whatsapp', telegram: 'telegram', sms: 'sms', email: 'email', 
            instagram: 'instagram', twitter: 'twitter', youtube: 'youtube',
            geo: 'geo', crypto: 'bitcoin', event: 'calendar'
        };

        // 3. Apply specific visual styling based on the active template
        if (modernDataTypes.includes(selectedType)) {
            // Setup modern configuration, while leaving logo setup for next step
            applyStyleTemplate('modern', true); 
            
            if (selectedType !== 'text' && typeToLogoMap[selectedType]) {
                uploadedImage = presetLogos[typeToLogoMap[selectedType]];
            }
        } else if (classicColoredTypes[selectedType]) {
            // Fallback to classic structure but heavily modified colors
            applyStyleTemplate('classic', true); 
            
            const brandColor = classicColoredTypes[selectedType];
            setVal('form-dots-color', brandColor);
            setVal('form-corners-square-color', brandColor);
            setVal('form-corners-dot-color', brandColor);
            
            if (typeToLogoMap[selectedType]) {
                uploadedImage = presetLogos[typeToLogoMap[selectedType]];
            }
        }
        
        updateQRCode();
    });

    function getDynamicQRText() {
        const t = dataTypeSelect.value;
        if (t === "text") return document.getElementById("form-data").value.trim() || " ";
        if (t === "wifi") {
            const s = document.getElementById("wifi-ssid").value.trim();
            const p = document.getElementById("wifi-pass").value.trim();
            const enc = document.getElementById("wifi-type").value;
            return s ? `WIFI:T:${enc};S:${s};P:${p};;` : " ";
        }
        if (t === "vcard") {
            const n = document.getElementById("vc-name").value.trim();
            const p = document.getElementById("vc-phone").value.trim();
            const e = document.getElementById("vc-email").value.trim();
            const c = document.getElementById("vc-company").value.trim();
            return n ? `BEGIN:VCARD\nVERSION:3.0\nFN:${n}\nORG:${c}\nTEL:${p}\nEMAIL:${e}\nEND:VCARD` : " ";
        }
        if (t === "phone") {
            const ph = document.getElementById("ph-num").value.trim();
            return ph ? "tel:" + ph : " ";
        }
        if (t === "facetime") {
            const ft = document.getElementById("ft-id").value.trim();
            return ft ? "facetime:" + ft : " ";
        }
        if (t === "email") {
            const to = document.getElementById("em-to").value.trim();
            const sub = document.getElementById("em-sub").value.trim();
            const body = document.getElementById("em-body").value.trim();
            return to ? `mailto:${to}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}` : " ";
        }
        if (t === "sms") {
            const p = document.getElementById("sms-phone").value.trim();
            const m = document.getElementById("sms-msg").value.trim();
            return `smsto:${p}:${m}`;
        }
        if (t === "whatsapp") {
            const p = document.getElementById("wa-phone").value.trim().replace(/[^0-9]/g, "");
            const m = document.getElementById("wa-msg").value.trim();
            return p ? `https://wa.me/${p}${m ? "?text=" + encodeURIComponent(m) : ""}` : " ";
        }
        if (t === "telegram") {
            const user = document.getElementById("tg-user").value.trim().replace("@", "");
            const msg = document.getElementById("tg-msg").value.trim();
            if (!user) return " ";
            return msg ? `https://t.me/share/url?url=${user}&text=${encodeURIComponent(msg)}` : `https://t.me/${user}`;
        }
        if (t === "instagram") {
            const ig = document.getElementById("ig-user").value.trim();
            return ig ? "https://instagram.com/" + ig : " ";
        }
        if (t === "twitter") {
            const tw = document.getElementById("tw-user").value.trim();
            return tw ? "https://x.com/" + tw : " ";
        }
        if (t === "youtube") {
            const yt = document.getElementById("yt-url").value.trim();
            return yt ? yt : " ";
        }
        if (t === "geo") {
            const lat = document.getElementById("geo-lat").value;
            const lng = document.getElementById("geo-lng").value;
            return (lat && lng) ? `geo:${lat},${lng}` : " ";
        }
        if (t === "crypto") {
            const coin = document.getElementById("crypto-type").value;
            const addr = document.getElementById("crypto-addr").value.trim();
            const amt = document.getElementById("crypto-amount").value.trim();
            return addr ? `${coin}:${addr}${amt ? "?amount=" + amt : ""}` : " ";
        }
        if (t === "event") {
            const title = document.getElementById("ev-title").value.trim();
            const loc = document.getElementById("ev-loc").value.trim();
            const startRaw = document.getElementById("ev-start").value;
            const endRaw = document.getElementById("ev-end").value;
            const formatDT = (d) => d ? d.replace(/[-:]/g, "") + "00Z" : "";
            return title ? `BEGIN:VEVENT\nSUMMARY:${title}\nLOCATION:${loc}\nDTSTART:${formatDT(startRaw)}\nDTEND:${formatDT(endRaw)}\nEND:VEVENT` : " ";
        }
        return " ";
    }

    // --- Build Options for qr-code-styling ---
    function getStyleOptions(prefix) {
        const typeElem = document.getElementById(`form-${prefix}-type`);
        const type = typeElem ? typeElem.value : undefined;
        const isGradient = document.getElementById(`form-${prefix}-color-type-gradient`)?.checked;
        const singleColor = document.getElementById(`form-${prefix}-color`)?.value;

        const result = {};
        
        // This explicitly handles the "None" clearing properly
        if (typeElem) {
            result.type = type; 
        }

        if (isGradient) {
            const gradTypeElem = document.querySelector(`input[name="${prefix}-gradient-type"]:checked`);
            const gradType = gradTypeElem && gradTypeElem.id.includes('radial') ? 'radial' : 'linear';
            const rotation = Number(document.getElementById(`form-${prefix}-gradient-rotation`)?.value || 0);
            
            result.gradient = {
                type: gradType, rotation: rotation * (Math.PI / 180),
                colorStops:[
                    { offset: 0, color: document.getElementById(`form-${prefix}-color1`)?.value || '#000000' },
                    { offset: 1, color: document.getElementById(`form-${prefix}-color2`)?.value || '#000000' }
                ]
            };
        } else if (singleColor) {
            result.color = singleColor;
        }

        return result;
    }

    function buildOptionsFromDOM(isExport = false) {
        const size = isExport ? Number(document.getElementById('qr-download-size').value) : 300;
        const opts = {
            width: size, height: size,
            data: getDynamicQRText(),
            margin: Number(document.getElementById('form-margin').value) || 0,
            qrOptions: {
                typeNumber: Number(document.getElementById('form-qr-type-number').value) || 0,
                mode: document.getElementById('form-qr-mode').value,
                errorCorrectionLevel: document.getElementById('form-qr-error-correction-level').value
            },
            imageOptions: {
                hideBackgroundDots: document.getElementById('form-hide-background-dots').checked,
                imageSize: Number(document.getElementById('form-image-size').value) || 0.4,
                margin: Number(document.getElementById('form-image-margin').value) || 0,
                crossOrigin: "anonymous",
            },
            dotsOptions: getStyleOptions('dots'),
            backgroundOptions: getStyleOptions('background'),
            cornersSquareOptions: getStyleOptions('corners-square'),
            cornersDotOptions: getStyleOptions('corners-dot')
        };
        
        if (bgTransparentCheckbox.checked) opts.backgroundOptions = { color: "transparent" };
        
        // Use uploadedImage string (even if empty string to clear the logo)
        opts.image = uploadedImage || "";
        
        return opts;
    }

    // --- Master Render Function ---
    function updateQRCode() {
        const options = buildOptionsFromDOM(false); 
        const container = document.getElementById("qr-code-generated");
        
        // Destruct and Re-instantiate totally eliminates caching bugs with empty corners or gradients merging
        container.innerHTML = ""; 
        qrCode = new QRCodeStyling(options);
        qrCode.append(container);
    }

    document.getElementById('form').addEventListener('input', updateQRCode);
    document.getElementById('form').addEventListener('change', updateQRCode);

    // --- Image Upload & Quick Logos ---
    const fileInput = document.getElementById("form-image-file");
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => { uploadedImage = event.target.result; updateQRCode(); };
            reader.readAsDataURL(file);
        }
    });

    document.querySelectorAll('.logo-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const logoType = e.target.getAttribute('data-logo');
            if (logoType === 'none') {
                uploadedImage = ""; // Using empty string successfully drops the image
                fileInput.value = "";
            } else {
                uploadedImage = presetLogos[logoType] || 'logos/logo-default.png';
            }
            updateQRCode();
        });
    });

    // Clear Corner Settings Buttons
    document.getElementById('button-clear-corners-square-color')?.addEventListener('click', () => { 
        setVal('form-corners-square-type', ''); 
        updateQRCode(); 
    });
    
    document.getElementById('button-clear-corners-dot-color')?.addEventListener('click', () => { 
        setVal('form-corners-dot-type', ''); 
        updateQRCode(); 
    });

    // --- JSON Export / Import Settings ---
    document.getElementById('export-options').addEventListener('click', () => {
        const options = buildOptionsFromDOM(false);
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(options, null, 2));
        const a = document.createElement('a'); a.href = dataStr; a.download = "qr-code-options.json"; a.click();
    });

    document.getElementById('import-options-btn').addEventListener('click', () => {
        document.getElementById('import-json-file').click();
    });

    document.getElementById('import-json-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const opts = JSON.parse(event.target.result);
                applyOptionsToDOM(opts);
            } catch (err) {
                alert("Invalid JSON settings file.");
            }
            e.target.value = ''; // Reset file input
        };
        reader.readAsText(file);
    });

    function applyOptionsToDOM(opts) {
        if (!opts) return;

        if (opts.data) {
            setVal('data-type', 'text');
            document.getElementById('data-type').dispatchEvent(new Event('change'));
            setVal('form-data', opts.data);
        }
        if (opts.margin !== undefined) setVal('form-margin', opts.margin);

        if (opts.qrOptions) {
            if (opts.qrOptions.errorCorrectionLevel) setVal('form-qr-error-correction-level', opts.qrOptions.errorCorrectionLevel);
            if (opts.qrOptions.typeNumber) setVal('form-qr-type-number', opts.qrOptions.typeNumber);
            if (opts.qrOptions.mode) setVal('form-qr-mode', opts.qrOptions.mode);
        }

        if (opts.imageOptions) {
            setChecked('form-hide-background-dots', opts.imageOptions.hideBackgroundDots);
            if (opts.imageOptions.imageSize) setVal('form-image-size', opts.imageOptions.imageSize);
            if (opts.imageOptions.margin !== undefined) setVal('form-image-margin', opts.imageOptions.margin);
        }

        uploadedImage = opts.image || "";

        function applyStyle(prefix, styleOpts) {
            if (!styleOpts) return;
            if (styleOpts.type !== undefined) setVal(`form-${prefix}-type`, styleOpts.type);
            
            if (styleOpts.gradient) {
                setChecked(`form-${prefix}-color-type-gradient`, true);
                setChecked(`form-${prefix}-gradient-type-${styleOpts.gradient.type || 'linear'}`, true);
                if (styleOpts.gradient.rotation) setVal(`form-${prefix}-gradient-rotation`, Math.round(styleOpts.gradient.rotation * (180/Math.PI)));
                if (styleOpts.gradient.colorStops && styleOpts.gradient.colorStops.length >= 2) {
                    setVal(`form-${prefix}-color1`, styleOpts.gradient.colorStops[0].color);
                    setVal(`form-${prefix}-color2`, styleOpts.gradient.colorStops[1].color);
                }
            } else if (styleOpts.color) {
                if (styleOpts.color === 'transparent' && prefix === 'background') {
                    setChecked('form-bg-transparent', true);
                } else {
                    setChecked(`form-${prefix}-color-type-single`, true);
                    if (prefix === 'background') setChecked('form-bg-transparent', false);
                    setVal(`form-${prefix}-color`, styleOpts.color);
                }
            }
            document.getElementById(`form-${prefix}-color-type-single`)?.dispatchEvent(new Event('change'));
        }

        applyStyle('dots', opts.dotsOptions);
        applyStyle('corners-square', opts.cornersSquareOptions);
        applyStyle('corners-dot', opts.cornersDotOptions);
        applyStyle('background', opts.backgroundOptions);

        updateQRCode();
    }

    // --- Action Button Actions (High Res Download) ---
    document.getElementById('qr-download').addEventListener('click', () => {
        const extension = document.getElementById('qr-extension').value;
        const exportOptions = buildOptionsFromDOM(true); 
        const tempQr = new QRCodeStyling(exportOptions);
        tempQr.download({ name: "stylish-qr-code", extension: extension });
    });

    // Boot Up Configuration
    updateQRCode();
});