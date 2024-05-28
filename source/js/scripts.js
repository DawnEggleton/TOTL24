let pageType = document.querySelector('body').id;
let pageID = document.querySelector('body').id;
let pageClasses = document.querySelector('body').classList;

//click to change subaccounts
document.querySelectorAll('#post_as_menu option').forEach(account => {
    account.innerHTML = account.innerHTML.replace(/&nbsp;&nbsp;»/g,'');
});
let switcher = document.querySelector('#account-switch #subaccounts_menu select');
if(switcher !== null) {
    document.querySelectorAll('select[name="sub_id"] option').forEach(account => {
        account.innerHTML = account.innerHTML.replace(/&nbsp;&nbsp;»/g,'');
    });
    initSwitcher();
}

//remove empty tooltips
$('*[title=""]').removeAttr('title');
$('*[tooltip=""]').removeAttr('tooltip');
if (typeof tippy === 'function') {
    tippy(document.querySelectorAll('[title]'), {
        content: (reference) => {
	    function htmlDecode(input){
		var e = document.createElement('div');
		e.innerHTML = input;
		return e.childNodes[0].nodeValue;
	    }
	    if(!reference.querySelector('.macro--button')) {
                const title = reference.getAttribute('title');
                reference.removeAttribute('title');
		const stringified = JSON.stringify({title: title});
		
		if(reference.classList.contains('profile-link')) {
                    return capitalize(htmlDecode(title));
		} else {
                    return htmlDecode(title);
		}
	    }
        },
        theme: 'godlybehaviour',
        arrow: false
    });
}

//quick login
if(document.querySelector('body').classList.contains('g-2')) {
    initQuickLogin();
} else {
    if($('#quick-login').length) {
        //$('#quick-login').remove();
    }
    //$('#quick-login-clip').remove();
}

//init clipboards
let clipboards = document.querySelectorAll('tag-code');
let codes = document.querySelectorAll(`table[id='CODE-WRAP']`);
if (clipboards.length > 0) {
    initClipboard();
}
if (codes.length > 0) {
    initCodebox();
}

/********** Window Click **********/
document.querySelector('.invisibleEl').addEventListener('click', e => {
	document.querySelector('.nav--popout').classList.remove('is-open');
	document.querySelector('.nav--options').classList.remove('is-open');
	document.querySelector('.button--menu').classList.remove('is-open');
	e.target.classList.remove('menu-open');
});

/********** Initializations **********/
setTheme();
setSize();
initModals();
initCopyLink();
highlightCode();

/********** Universal Tabbing, with Hash **********/
if(document.querySelector('.tabbed')) {
    let tabbed = document.querySelectorAll('.tabbed');
    tabbed.forEach(set => {
        let labels = set.querySelectorAll('.tab-label');
        let tabs = set.querySelectorAll('[data-tab]');
    
        //on load
        if(window.location.hash) {
            let hash = window.location.hash;
            let activeLabel = document.querySelector(`.tab-label[href="${hash}"]`);
            let activeTab = document.querySelector(`[data-tab="${hash}"]`);
            if(activeLabel && activeTab) {
                labels.forEach(label => label.classList.remove('is-active'));
                tabs.forEach(tab => tab.classList.remove('is-active'));
                activeLabel.classList.add('is-active');
                activeTab.classList.add('is-active');
            } else {
                labels.forEach(label => label.classList.remove('is-active'));
                tabs.forEach(tab => tab.classList.remove('is-active'));
                labels[0].classList.add('is-active');
                tabs[0].classList.add('is-active');
            }
        } else {
            labels.forEach(label => label.classList.remove('is-active'));
            tabs.forEach(tab => tab.classList.remove('is-active'));
            labels[0].classList.add('is-active');
            tabs[0].classList.add('is-active');
        }

        //on click
        labels.forEach(label => {
            label.addEventListener('click', e => {
                let hash = e.currentTarget.getAttribute('href');
                let activeLabel = document.querySelector(`.tab-label[href="${hash}"]`);
                let activeTab = document.querySelector(`[data-tab="${hash}"]`);
                if(activeLabel && activeTab) {
                    labels.forEach(label => label.classList.remove('is-active'));
                    tabs.forEach(tab => tab.classList.remove('is-active'));
                    activeLabel.classList.add('is-active');
                    activeTab.classList.add('is-active');
                }
            });
        });
    });
}

/********** Universal Accordion **********/
if(document.querySelector('.accordion')) {
    let accordionLabels = document.querySelectorAll('.accordion-label');
    accordionLabels.forEach(label => {
        label.addEventListener('click', e => {
            e.currentTarget.classList.toggle('is-open');
            e.currentTarget.nextElementSibling.classList.toggle('is-open');
        });
    });
}

/********** Index & Category View Only **********/
if(pageType === 'idx' || pageType === 'SC') {
	initForums();

    document.querySelector('.stats--recent').innerHTML = document.querySelector('#recent-topics table').outerHTML;
    document.querySelector('#recent-topics').remove();
}

/********** Topic List Only **********/
if(pageType === 'SF') {
	initForums();
    initTopicsWrap();
}

/********** Profile **********/
if(pageType === 'Profile') {
    let profile = document.querySelector('.profile');
    let labels = profile.querySelectorAll('.tab-label');
    if(!window.location.hash || window.location.hash === '#intro') {
        profile.classList.add('is-first');
    } else {
        profile.classList.remove('is-first');
    }
    labels.forEach(label => {
        label.addEventListener('click', e => {
            if(e.currentTarget.getAttribute('href') === '#intro' && e.currentTarget.classList.contains('is-active')) {
                profile.classList.add('is-first');
            } else {
                profile.classList.remove('is-first');
            }
        });
    });

    let fields = document.querySelectorAll('.profile--item span, .profile--item div');
    fields.forEach(item => {
        if(item.innerText.toLowerCase().trim() === 'no information' ||
        item.innerText.toLowerCase().trim() === 'n/a' ||
        item.innerText.toLowerCase().trim() === 'none') {
            item.closest('.profile--item').remove();
        }
    });

    let warnings = document.querySelector('.warnings .scroll.charOnly');
    if(warnings.innerText.toLowerCase().trim() === 'no information' ||
    warnings.innerText.toLowerCase().trim() === 'n/a' ||
    warnings.innerText.toLowerCase().trim() === 'none') {
        warnings.innerText = 'This application does require content warnings.';
    }

    let triggers = document.querySelector('.warnings .scroll.memAccOnly');
    if(triggers.innerText.toLowerCase().trim() === 'no information' ||
    triggers.innerText.toLowerCase().trim() === 'n/a' ||
    triggers.innerText.toLowerCase().trim() === 'none') {
        triggers.innerText = 'This member has no triggers.';
    }
}

/********** Member List Only **********/
if(pageType === 'Members') {
	initMembers();
}

/********** Login **********/
if(pageType === 'Login') {
    let textNodes = getAllTextNodes(document.querySelector('main'));
    textNodes.forEach(node => {
        const paragraph = document.createElement('p');
        node.after(paragraph);
        paragraph.appendChild(node);
    });
    $("main > p").nextUntil("div.tableborder").andSelf().wrapAll(`<div class="textNodes"></div>`);
    $(`input[name="UserName"]`).attr('placeholder','Username');
    $(`input[name="PassWord"]`).attr('placeholder','Password');
}

/********** Registration **********/
if(pageType === 'Reg') {
    let textNodes = getAllTextNodes(document.querySelector('.tablepad > table > tbody > tr:first-child > td:last-child fieldset:first-child'));
    if(textNodes) {
        textNodes.forEach(node => {
            const paragraph = document.createElement('p');
            node.after(paragraph);
            paragraph.appendChild(node);
        });
    }
    inputWrap(`label[for="agree_cbox"] input[name="read_tos"]`);
    inputWrap(`fieldset input[name="allow_admin_mail"]`);
    inputWrap(`fieldset input[name="allow_member_mail"]`);
    fancyBoxes();
    if(document.querySelector('input[name="agree"][type="checkbox"]')) {
        $('input[name="agree"][type="checkbox"]').wrap('<label class="input-wrap tos"></label>');
        $('.input-wrap.tos').append('<div class="fancy-input checkbox"><i class="fa-solid fa-check"></i></div> <p>I agree to the terms of this registration, <b>I am at least 18 years of age,</b> and wish to proceed.</p>');
    }
}

/********** Topic View **********/
if(pageType === 'ST') {
    initPostContentAlter();
    initMiniTabs();
    document.querySelectorAll('.post.g-4 .charOnly, .post.g-20 .charOnly, .post.g-3.acc-Member .charOnly').forEach(el => el.remove());
    initCopyLink();
    
    //input clean up
    document.querySelector('#qr_open .tablepad').innerHTML = document.querySelector('#qr_open .tablepad').innerHTML.replace('|', '');
    let textNodes = getAllTextNodes(document.querySelector('#qr_open .tablepad'));
    textNodes.forEach(node => {
        const paragraph = document.createElement('p');
        node.after(paragraph);
        paragraph.appendChild(node);
        paragraph.innerText = paragraph.innerText.replace(`|`, ``).trim();
    });
    document.querySelectorAll(`#qr_open input[type="checkbox"]`).forEach(input => inputWrap(input));
    document.querySelectorAll('#qr_open .input-wrap').forEach(label => {
        label.querySelector('input').insertAdjacentHTML('afterend', `<div class="fancy-input checkbox">x</div>`);
    });
    $('#qr_open .tablepad > input').wrapAll('<div class="qr_buttons"></div>');

    initDiscordTagging('#ST main > table > tbody > tr > td:last-child');
}

/********** Topic View **********/
if(pageType === 'Post') {
    let textNodes = getAllTextNodes(document.querySelector('#post-options .pformright'));
    if(textNodes) {
        textNodes.forEach(node => {
            const paragraph = document.createElement('p');
            node.after(paragraph);
            paragraph.appendChild(node);
        });
    }
    inputWrap(`input[name="enableemo"]`, 'br');
    inputWrap(`input[name="enablesig"]`, 'br');
    inputWrap(`input[name="enabletrack"]`, 'br');
    document.querySelectorAll('input[name="iconid"]').forEach(icon => {
        inputWrap(icon, `input`, 'radio');
    });
    fancyBoxes();
}

/********** User CP & Messages **********/
if(pageType === 'UserCP' || pageType === 'Msg') {
    initUCPMenu();

    document.querySelector('#ucpcontent').innerHTML = `<div class="ucp--content-inner scroll">${document.querySelector('#ucpcontent').innerHTML}</div>`;

    //subaccounts
    if($('body.code-54').length > 0) {
        document.querySelectorAll('input[name="sub_ids[]"]').forEach(input => {
            inputWrap(input);
        });
        fancyBoxes();
    }

    //alerts
    if($('body.code-alerts').length > 0) {
        document.querySelectorAll('input[name="alert_id[]"]').forEach(input => {
            inputWrap(input);
        });
        fancyBoxes();
    }

    //forum and topic subscriptions
    if (pageClasses.contains('code-50') || pageClasses.contains('code-26')) {
        document.querySelectorAll('.tableborder > table > tbody > tr').forEach(row => {
            if(row.querySelectorAll('th, td').length === 1) {
                row.classList.add('ucp--header', 'pformstrip');
            }
        });

        if(pageClasses.contains('code-26')) {
            document.querySelectorAll(`.tableborder input[type="checkbox"]`).forEach(input => inputWrap(input));
            fancyBoxes();
        }
    }
    
    //board settings
    if (pageClasses.contains('code-04')) {
        inputWrap(document.querySelector(`input[name="DST"]`));
        fancyBoxes();
    }
    
    //alert settings
    if (pageClasses.contains('code-alerts_settings') || pageClasses.contains('code-02')) {
        document.querySelectorAll(`input[type="checkbox"]`).forEach(input => inputWrap(input));
        fancyBoxes();
    }

    initUCPEdit();
}

/********** Store **********/
if(pageType === 'store') {
    initStoreMenu();
    
    if(!pageClasses.contains('store-edit_points') && !pageClasses.contains('store-donate_item') && !pageClasses.contains('store-donate_money') && !pageClasses.contains('store-fine') && !pageClasses.contains('store-edit_inventory') && !pageClasses.contains('store-useitem') && !pageClasses.contains('store-do_edit_points')) {
        document.querySelector('#ucpcontent').innerHTML = `<div class="ucp--content-inner scroll">${document.querySelector('#ucpcontent').innerHTML}</div>`;
    }
}