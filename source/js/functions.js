/****** Utilities ******/
function fixMc(str) {
    return (""+str).replace(/Mc(.)/g, function(m, m1) {
        return 'Mc' + m1.toUpperCase();
    });
}
function fixMac(str) {
    return (""+str).replace(/Mac(.)/g, function(m, m1) {
        return 'Mac' + m1.toUpperCase();
    });
}
function capitalize(str, separators = [` `, `'`, `-`]) {
    str = str.replaceAll(`\&\#39\;`, `'`);
    separators = separators || [ ' ' ];
    var regex = new RegExp('(^|[' + separators.join('') + '])(\\w)', 'g');
    let first = str.split(' ')[0].replace(regex, function(x) { return x.toUpperCase(); });
    let last = fixMac(fixMc(str.split(' ').slice(1).join(' ').replace(regex, function(x) { return x.toUpperCase(); })));
    return `${first} ${last}`;
}
function capitalizeMultiple(selector) {
    document.querySelectorAll(selector).forEach(character => {
        character.innerText = capitalize(character.innerText);
    });
}
function setMonth(month) {
    switch(month) {
        case 'January':
            month = 1;
            break;
        case 'February':
            month = 2;
            break;
        case 'March':
            month = 3;
            break;
        case 'April':
            month = 4;
            break;
        case 'May':
            month = 5;
            break;
        case 'June':
            month = 6;
            break;
        case 'July':
            month = 7;
            break;
        case 'August':
            month = 8;
            break;
        case 'September':
            month = 9;
            break;
        case 'October':
            month = 10;
            break;
        case 'November':
            month = 11;
            break;
        case 'December':
            month = 12;
            break;
        default:
            month = -1;
            break;
    }

    return month;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function cleanText(text) {
	return text.replaceAll(' ', '').replaceAll('&amp;', '').replaceAll('&', '').replaceAll(`'`, '').replaceAll(`"`, '').replaceAll(`.`, '').replaceAll(`(`, '').replaceAll(`)`, '').replaceAll(`,`, '').replaceAll(`’`, '').replaceAll(`é`, `e`).replaceAll(`è`, `e`).replaceAll(`ê`, `e`).replaceAll(`ë`, `e`).replaceAll(`ě`, `e`).replaceAll(`ẽ`, `e`).replaceAll(`ē`, `e`).replaceAll(`ė`, `e`).replaceAll(`ę`, `e`).replaceAll(`à`, `a`).replaceAll(`á`, `a`).replaceAll(`â`, `a`).replaceAll(`ä`, `a`).replaceAll(`ǎ`, `a`).replaceAll(`æ`, `ae`).replaceAll(`ã`, `a`).replaceAll(`å`, `a`).replaceAll(`ā`, `a`).replaceAll(`í`, `i`).replaceAll(`ì`, `i`).replaceAll(`ı`, `i`).replaceAll(`î`, `i`).replaceAll(`ï`, `i`).replaceAll(`ǐ`, `i`).replaceAll(`ĭ`, `i`).replaceAll(`ī`, `i`).replaceAll(`ĩ`, `i`).replaceAll(`į`, `i`).replaceAll(`ḯ`, `i`).replaceAll(`ỉ`, `i`).replaceAll(`ó`, `o`).replaceAll(`ò`, `o`).replaceAll(`ȯ`, `o`).replaceAll(`ô`, `o`).replaceAll(`ö`, `o`).replaceAll(`ǒ`, `o`).replaceAll(`ŏ`, `o`).replaceAll(`ō`, `o`).replaceAll(`õ`, `o`).replaceAll(`ǫ`, `o`).replaceAll(`ő`, `o`).replaceAll(`ố`, `o`).replaceAll(`ồ`, `o`).replaceAll(`ø`, `o`).replaceAll(`ṓ`, `o`).replaceAll(`ṑ`, `o`).replaceAll(`ȱ`, `o`).replaceAll(`ṍ`, `o`).replaceAll(`ú`, `u`).replaceAll(`ù`, `u`).replaceAll(`û`, `u`).replaceAll(`ü`, `u`).replaceAll(`ǔ`, `u`).replaceAll(`ŭ`, `u`).replaceAll(`ū`, `u`).replaceAll(`ũ`, `u`).replaceAll(`ů`, `u`).replaceAll(`ų`, `u`).replaceAll(`ű`, `u`).replaceAll(`ʉ`, `u`).replaceAll(`ǘ`, `u`).replaceAll(`ǜ`, `u`).replaceAll(`ǚ`, `u`).replaceAll(`ṹ`, `u`).replaceAll(`ǖ`, `u`).replaceAll(`ṻ`, `u`).replaceAll(`ủ`, `u`).replaceAll(`ȕ`, `u`).replaceAll(`ȗ`, `u`).replaceAll(`ư`, `u`);
}

//Filters
function filterValue(e) {
    let searchValue = e.value.toLowerCase().trim();
    let names = document.querySelectorAll(`${e.dataset.filter} .claim ${e.dataset.objects}`);
    let headers = document.querySelectorAll(`${e.dataset.filter} ${e.dataset.headers}`);
    if(searchValue !== '') {
        e.parentNode.classList.add('pb');
        headers.forEach(header => header.classList.add('hide'));
        names.forEach(name => {
            let nameValue = name.innerText.toLowerCase().trim();
            if (nameValue.indexOf(searchValue) > -1) {
                name.parentElement.classList.remove('hide');
            } else {
                name.parentElement.classList.add('hide');
            }
        });
    } else {
        e.parentNode.classList.remove('pb');
        headers.forEach(header => header.classList.remove('hide'));
        names.forEach(name => name.parentElement.classList.remove('hide'))
    }
}
function appendSearchQuery(param, value) {
	const url = new URL(window.location.href);
	url.searchParams.set(param, value);
	window.history.replaceState(null, null, url);
}
function initClipboard() {
    let clipboard = new Clipboard('.clipboard');
    clipboard.on('success', function(e) {
        console.log('clipboard success: ' + e);
    });
    clipboard.on('error', function(e) {
        console.log('clipboard error: ' + e);
    });
    let clipcode = new Clipboard('.codeclick', {
        target: function(trigger) {
        return trigger.nextElementSibling;
        }
    });
}
function initCodebox() {
    $("table[id='CODE-WRAP']").each(function() {
        var cc = $(this).find("td[id='CODE']").html();

        $(this).html(
            "<div class='codeblock code--wrapper'><div class='c-title codeclick'>Click to Copy</div><div class='codecon'><pre><code class='scroll'>"
            + cc +
            "</code></pre></div></div>"
        );
    });
}
function initCopyLink() {
    let clippedURL = new Clipboard('.post--permalink');
    document.querySelectorAll('.post--permalink').forEach(link => {
        link.addEventListener('click', e => {
            e.currentTarget.querySelector('.note').style.opacity = 1;
            setTimeout(() => {
                document.querySelectorAll('.note').forEach(note => note.style.opacity = 0);
            }, 3000);
        });
    });
}
function translationSwitch(e) {
        let current = e.innerText;
        let original = e.dataset.original;
        let translation = e.dataset.result;
        if(current === original) {
            e.innerText = translation;
        } else {
            e.innerText = original;
        }
}
function htmlencode(str) {
    return str.replace(/[&<>"']/g, function($0) {
        return "&" + {"&":"amp", "<":"lt", ">":"gt", '"':"quot", "'":"#39"}[$0] + ";";
    });
}
function highlightCode() {
    let clipcodeQuick = new Clipboard('.copyQuick', {
        target: function(trigger) {
            if(trigger.nextElementSibling.querySelector('textarea')) {
                return trigger.nextElementSibling.querySelector('textarea');
            } else {
                return trigger.nextElementSibling.querySelector('code');
            }
        }
    });
}
function getAllTextNodes(element) {
    if(element) {
        return Array.from(element.childNodes).filter(node => node.nodeType === 3 && node.textContent.trim().length > 1);
    }
}
function getAllTextNodesArray(elements) {
    let array = [];
    if(elements) {
        elements.forEach(element => {
            let nodes = Array.from(element.childNodes).filter(node => node.nodeType === 3 && node.textContent.trim().length > 1);
            if(nodes.length > 0) {
                array = [...array, ...nodes];
            }
        });
    }
    return array;
}
function inputWrap(el, next = null, type = 'checkbox') {
    if(next) {
        $(el).nextUntil(next).andSelf().wrapAll(`<label class="input-wrap ${type}"></label>`);
    } else {
        $(el).next().andSelf().wrapAll(`<label class="input-wrap ${type}"></label>`);
    }
}
function fancyBoxes() {
    document.querySelectorAll('.input-wrap.checkbox').forEach(label => {
        label.querySelector('input').insertAdjacentHTML('afterend', `<div class="fancy-input checkbox"><i class="fa-solid fa-check"></i></div>`);
    });
    document.querySelectorAll('.input-wrap.radio').forEach(label => {
        label.querySelector('input').insertAdjacentHTML('afterend', `<div class="fancy-input radio"><i class="fa-solid fa-check"></i></div>`);
    });
}
function read_alerts() {
    $('#recent-alerts').fadeOut();
    $.get( "index.php?recent_alerts=1&read=1", function( data ) {
        $( "#recent_alerts_data" ).html( data );
    });
    document.querySelectorAll('a[title="Alerts"]').forEach(alert => alert.classList.remove('new'));
}
function close_alerts() {
    $('#recent-alerts').fadeOut();
}
function load_alerts() {
    if($('#recent-alerts').is(':visible')) {
        $('#recent-alerts').fadeOut();
    } else {
        $.get( "?recent_alerts=1", function( data ) {
            $( "#recent-alerts-data" ).html( data );
        });
        $("#recent-alerts").fadeIn();
    }
}
function initTabs(isHash = false, wrapClass, menuClass, tabWrapClass, activeClass = 'is-active', categoryClass = null, firstClasses = []) {
    if(isHash) {
        window.addEventListener('hashchange', function(e){
            initHashTabs(wrapClass, menuClass, tabWrapClass, activeClass, categoryClass);
        });

        //hash linking
        if (window.location.hash){
            initHashTabs(wrapClass, menuClass, tabWrapClass, activeClass, categoryClass);
        } else {
            initFirstHashTab(firstClasses, activeClass);
        }
    } else {
        initRegularTabs(menuClass);
    }
}
function initRegularTabs(menuClass) {
    let labels = document.querySelectorAll(`${menuClass} > tag-label`);
    labels.forEach(label => {
        label.addEventListener('click', e => {
            let selected = e.currentTarget;
            let tab = document.querySelector(`tag-tab[data-key="${selected.dataset.key}"]`);
            let tabSiblings = Array.from(tab.parentNode.children);
            let tabIndex = tabSiblings.indexOf.call(tabSiblings, tab);
            
            labels.forEach(label => label.classList.remove('is-active'));
            tabSiblings.forEach(tab => tab.classList.remove('is-active'));
            
            selected.classList.add('is-active');
            tab.classList.add('is-active');
            tabSiblings.forEach(sibling => sibling.style.left = `${-100 * tabIndex}%`);
        });
    });
}
function initHashTabs(wrapClass, menuClass, tabWrapClass, activeClass, categoryClass = null) {
    //set variables for categories
    let selectedCategory, hashMain, hashCategory, hashCategoryArray, categorySiblings, categoryIndex, hashTab, submenuSiblings, submenuIndex;

    //get hash and set basic variables
    let hash = $.trim( window.location.hash );
    let selected = document.querySelector(`${menuClass} a[href="${hash}"]`);
    let hashContent = document.querySelector(`tag-tab[data-key="${hash}"]`);
    let unsetDefault = Array.from(selected.parentNode.children);
    let tabSiblings = Array.from(hashContent.parentNode.children);
    let tabIndex = tabSiblings.indexOf.call(tabSiblings, hashContent);

    //set category variables document.querySelector(`.webpage--menu a[href="#tab2-2"]`).closest('.tab-category').getAttribute('data-category')
    if(categoryClass) {
        selectedCategory = selected.closest(categoryClass).getAttribute('data-category');

        hashMain = document.querySelector(`${menuClass} tag-label[data-category="${selectedCategory}"]`);

        hashCategory = document.querySelector(`${menuClass} tag-tab[data-category="${selectedCategory}"]`);
        if(!hashCategory) {
            hashCategoryArray = document.querySelectorAll(`${menuClass} [data-category="${selectedCategory}"]`);
        }
        
        hashTab = document.querySelector(`${tabWrapClass} tag-tab[data-category="${selectedCategory}"]`);

        if(hashCategory) {
            categorySiblings = Array.from(hashCategory.parentNode.children);
            categoryIndex = categorySiblings.indexOf.call(categorySiblings, hashCategory);
        }
        submenuSiblings = Array.from(hashTab.parentNode.children);
        submenuIndex = submenuSiblings.indexOf.call(submenuSiblings, hashTab);
    }

    //find the sub menu/inner menu link with the matching hash
    if (hash) {
        $(selected).trigger('click');
    }

    //Tabs
    //Remove active from everything
    document.querySelectorAll(`${menuClass} tag-label`).forEach(label => label.classList.remove(activeClass));
    document.querySelectorAll(`${menuClass} a`).forEach(label => label.classList.remove(activeClass));
    unsetDefault.forEach(label => label.classList.remove(activeClass));
    document.querySelectorAll(`${wrapClass} tag-tab`).forEach(label => label.classList.remove(activeClass));
    document.querySelectorAll(categoryClass).forEach(item => item.classList.remove(activeClass));

    //Add active
    selected.classList.add(activeClass);
    hashContent.classList.add(activeClass);
    if(hashCategoryArray) {
        hashCategoryArray.forEach(item => item.classList.add(activeClass));
    }

    //add active for category
    if(categoryClass) {
        hashMain.classList.add(activeClass);
        hashTab.classList.add(activeClass);
    }

    document.querySelector(menuClass).classList.remove('is-open');

    window.scrollTo(0, 0);
}
function initFirstHashTab(firstClasses, activeClass) {
    //Auto-select tab without hashtag present
    firstClasses.forEach(firstClass => {
        document.querySelector(firstClass).classList.add(activeClass);
    });
}
function initAccordion(target = '.accordion') {
    document.querySelectorAll(target).forEach(accordion => {
        let triggers = accordion.querySelectorAll('.accordion--trigger');
        let contents = accordion.querySelectorAll('.accordion--content');
        if(window.innerWidth <= 480) {
            triggers.forEach(trigger => trigger.classList.remove('is-active'));
            contents.forEach(trigger => trigger.classList.remove('is-active'));
        }
        triggers.forEach(trigger => {
            trigger.addEventListener('click', e => {
                let alreadyOpen = false;
                if(e.currentTarget.classList.contains('is-active')) {
                    alreadyOpen = true;
                }
                triggers.forEach(trigger => trigger.classList.remove('is-active'));
                contents.forEach(trigger => trigger.classList.remove('is-active'));
                if(alreadyOpen) {
                    e.currentTarget.classList.remove('is-active');
                    e.currentTarget.nextElementSibling.classList.remove('is-active');
                    alreadyOpen = false;
                } else {
                    e.currentTarget.classList.add('is-active');
                    e.currentTarget.nextElementSibling.classList.add('is-active');
                }
            });
        })
    })
}

/****** Settings ******/
function setTheme() {
    if(localStorage.getItem('theme') !== null) {
        switch(localStorage.getItem('theme')) {
            case 'light':
                document.querySelector('body').classList.remove('dark');
                document.querySelector('body').classList.add('light');
                break;
            case 'dark':
            default:
                document.querySelector('body').classList.add('dark');
                document.querySelector('body').classList.remove('light');
                break;
        }
    } else {
        document.querySelector('body').classList.add('light');
        document.querySelector('body').classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}
function setSize() {
    if(localStorage.getItem('size') !== null) {
        switch(localStorage.getItem('size')) {
            case 'xl':
                document.querySelector('body').classList.remove('smFont');
                document.querySelector('body').classList.remove('lgFont');
                document.querySelector('body').classList.add('xlFont');
                break;
            case 'large':
                document.querySelector('body').classList.remove('smFont');
                document.querySelector('body').classList.add('lgFont');
                document.querySelector('body').classList.remove('xlFont');
                break;
            case 'small':
            default:
                document.querySelector('body').classList.remove('lgFont');
                document.querySelector('body').classList.add('smFont');
                document.querySelector('body').classList.remove('xlFont');
                break;
        }
    } else {
        document.querySelector('body').classList.remove('xlFont');
        document.querySelector('body').classList.remove('lgFont');
        document.querySelector('body').classList.add('smFont');
        localStorage.setItem('size', 'small');
    }
}

/****** Toggles ******/
function toggleTheme() {
    if(localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
        setTheme();
    } else {
        localStorage.setItem('theme', 'dark');
        setTheme();
    }
}
function toggleSize() {
    if(localStorage.getItem('size') === 'small') {
        localStorage.setItem('size', 'large');
        setSize();
    } else if(localStorage.getItem('size') === 'large') {
        localStorage.setItem('size', 'xl');
        setSize();
    } else {
        localStorage.setItem('size', 'small');
        setSize();
    }
}
function toggleSideMenu(e) {
    let menu = document.querySelector('.nav--popout');
    if (e.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        e.classList.remove('is-open');
	    document.querySelector('.invisibleEl').classList.remove('menu-open');
    } else {
        menu.classList.add('is-open');
        e.classList.add('is-open');
	    document.querySelector('.invisibleEl').classList.add('menu-open');
    }
}
function toggleOptionsMenu(e) {
    let menu = document.querySelector('.nav--options');
    if (e.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        e.classList.remove('is-open');
	    document.querySelector('.invisibleEl').classList.remove('menu-open');
    } else {
        menu.classList.add('is-open');
        e.classList.add('is-open');
	    document.querySelector('.invisibleEl').classList.add('menu-open');
    }
}

/****** Global Initialization ******/
function initQuickLogin() {
    if($('#quick-login').length) {
        $('#quick-login').appendTo('#quick-login-clip');
        document.querySelector('#quick-login-clip input[name="UserName"]').setAttribute('placeholder', 'Username');
        document.querySelector('#quick-login-clip input[name="PassWord"]').setAttribute('placeholder', 'Password');
    } else {
        var main_url = location.href.split('?')[0];
        $.get(main_url, function (data) {
            $('#quick-login', data).appendTo('#quick-login-clip');
            document.querySelector('#quick-login-clip input[name="UserName"]').setAttribute('placeholder', 'Username');
            document.querySelector('#quick-login-clip input[name="PassWord"]').setAttribute('placeholder', 'Password');
        });
    }
}
function initModals() {
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', () => {
            let modalTag = popup.dataset.modal,
                modals = document.querySelectorAll('.modal'),
                modal;
            for(let i = 0; i < modals.length; i++) {
                if(modals[i].dataset.modalBox === modalTag) {
                    modal = modals[i];
                    modal.classList.add('is-open');
                }
            }
        });
    });
    document.querySelectorAll('.modal').forEach(modal => {
        window.addEventListener('click', e => {
            if(e.target.classList.contains('modal') || e.target.classList.contains('modal--close') || (e.target.parentNode && e.target.parentNode.classList.contains('modal--close')) || (e.target.parentNode && e.target.parentNode.parentNode && e.target.parentNode.parentNode.classList.contains('modal--close'))) {
                modal.classList.remove('is-open');
            }
        });
    });
}
function initSwitcher() {
	let characters = switcher.querySelectorAll('option');
	let newSwitch = `<div class="switch">`;
	characters.forEach((character, i) => {
		if(i !== 0) {
			let characterName = character.innerText.trim();
			let characterId = character.value;
            let siteString = `uploads/totl`;
			newSwitch += `<label class="switch-block">
				<input type="checkbox" value="${characterId}" onchange="this.form.submit()" name="sub_id" />
				<div style="background-image: url(https://files.jcink.net/${siteString}/av-${characterId}.png), url(https://files.jcink.net/${siteString}/av-${characterId}.gif), url(https://files.jcink.net/${siteString}/av-${characterId}.jpg), url(https://files.jcink.net/${siteString}/av-${characterId}.jpeg), url(https://picsum.photos/250);"></div>
				<b>${capitalize(characterName)}</b>
			</label>`;
		}
	});
	newSwitch += `</div>`;
	switcher.insertAdjacentHTML('afterend', newSwitch);
	switcher.remove();
}

/****** Index Initialization ******/
function initForums() {
    //manual links
    document.querySelectorAll('.forum .manual-links').forEach(linkSet => {
        //subforums exist
        let subforumEl = linkSet.closest('.forum--desc').nextElementSibling.nextElementSibling.querySelector('.subforums');
        if(subforumEl) {
            if(linkSet.dataset.position === 'start') {
                subforumEl.insertAdjacentHTML('afterbegin', linkSet.innerHTML);
            } else {
                subforumEl.insertAdjacentHTML('beforeend', linkSet.innerHTML);
            }
        }
        //subforums don't exist
        else {
            linkSet.closest('.forum').querySelector('.forum--links').insertAdjacentHTML('beforeend', linkSet.innerHTML);
            linkSet.closest('.forum').querySelector('.forum--links').classList.add('manual-only');
        }

        linkSet.remove();
    });
}

/****** Topic Initialization ******/
function initTopicsWrap() {
    if(document.querySelector('.macro--header')) {
        $(`.macro--header`).each(function (index) {
            $(this).nextUntil(`.macro--header`).wrapAll(`<div class="topics--section"></div>`);
        }); 
    } else {
        document.querySelector('.topics--list').classList.add('no-headers');
    }
}
function initDiscordTagging(location) {
    let selectOptions = `<label class="input-wrap">
        <input type="checkbox" name="tagging" data-channel="${openThreadsHook}" data-tag="">
        <div class="fancy-input"></div>
        <span>Open</span>
    </label>`;
    discordTags.forEach(user => {
        selectOptions += `<label class="input-wrap">
        <input type="checkbox" name="tagging" data-channel="${generalTagsHook}" data-tag="${user.id}">
        <div class="fancy-input"></div>
        <span>${user.alias}</span>
    </label>`;
    })

    document.querySelector(location).insertAdjacentHTML('beforeend', `<div class="alert-options">
        <button onClick="toggleAlerts(this)" class="macro--button">Alerts</button>
        <div class="alert-select">
            <div class="scroll">
                ${selectOptions}
            </div>
            <input type="button" name="sendAlert" id="sendAlert" value="Send Alert" />
        </div>
    </div>`);

    document.querySelector('#sendAlert').addEventListener('click', e => {
        let tags = Array.from(document.querySelectorAll('.alert-select .scroll input')).filter(item => item.checked);
        let channel = tags[0].dataset.channel;
        let tagString = ``;
        tags.forEach(tag => {
            if(tag.dataset.tag !== '') {
                tagString += `<@${tag.dataset.tag}> `;
            }
        });
        let topic = document.querySelector('.topic-title').innerText;
        let url = `${window.location.origin}${window.location.search}view=getnewpost`;
        var includes = [...new Set(Array.from(document.querySelectorAll('.post--name > a')).map(item => item.dataset.fullName))];
        var characterList = ``;
        includes.forEach((character, i) => {
            if(includes.length > 2 && i < includes.length && i !== 0) {
                characterList += `, `;
            }
            if(includes.length === 2 && i !== 0) {
                characterList += ` `;
            }
            if ((includes.length === 2 && i !== 0) || (includes.length > 2 && i === includes.length - 1)) {
                characterList += `and `;
            }
            characterList += capitalize(character.toLowerCase()).trim();
        });
        let triggerBlock = document.querySelectorAll('.post--right .postcolor');
        let triggers = triggerBlock.length > 0 && triggerBlock[triggerBlock.length - 1].querySelector('.post--warning span') ? triggerBlock[triggerBlock.length - 1].querySelector('.post--warning span').innerText : false;
        let message = `Featuring ${characterList}`;
        if(triggers) {
            message += `\n**TW:** ${triggers}`;
        }

        if(channel !== '' && tagString !== '') {
            sendDiscordTag(channel, `You've been tagged!`, `[${capitalize(topic.toLowerCase(), [` `, `-`])}](<${url}>)
            ${message}`, tagString);
        }
        document.querySelectorAll('.alert-select .scroll input').forEach(option => option.checked = false);
        document.querySelector('#sendAlert').value = 'Sent!';
        setTimeout(function () {
            document.querySelector('#sendAlert').value = 'Send Alert';
        }, 1000);
    });
}
function toggleAlerts(e) {
    e.closest('.alert-options').querySelector('.alert-select').classList.toggle('is-open');
}
function sendDiscordTag(webhook, embedTitle, message, notification) {
    const request = new XMLHttpRequest();
    request.open("POST", webhook);

    request.setRequestHeader('Content-type', 'application/json');

    const params = {
  	"content": notification,
	  "embeds": [
	    {
	      "title": embedTitle,
	      "description": message,
	    }
	  ],
	  "attachments": []
	};

    request.send(JSON.stringify(params));
}

/****** Post Initialization ******/
function initMiniTabs() {
    //for arrows
    document.querySelectorAll('.post--mini-nav').forEach(miniNav => {
        let arrows = miniNav.querySelectorAll('.post--arrow');
        let activeIndex = 0;
        arrows.forEach(arrow => {
            arrow.addEventListener('click', e => {
                let slides = miniNav.parentNode.querySelectorAll('.post--mini-slide');
                slides.forEach((slide, i) => {
                    if(slide.classList.contains('is-active')) {
                        activeIndex = i;
                    }
                });
                if(e.currentTarget.classList.contains('arrow-left')) {
                    if(activeIndex === 0) {
                        activeIndex = slides.length - 1;
                    } else {
                        activeIndex--;
                    }
                } else {
                    if(activeIndex === slides.length - 1) {
                        activeIndex = 0;
                    } else {
                        activeIndex++;
                    }
                }
                slides.forEach(slide => {
                    slide.classList.remove('is-active');
                    slide.style.left = `${-100 * activeIndex}%`;
                });
                slides[activeIndex].classList.add('is-active');

                if(activeIndex !== 0) {
                    e.currentTarget.closest('.post--avatar').querySelector('.post--image').classList.add('effect--image-fade');
                } else {
                    e.currentTarget.closest('.post--avatar').querySelector('.post--image').classList.remove('effect--image-fade');
                }
            });
        });
    });
}
function initPostContentAlter() {
    document.querySelectorAll('.post--right .postcolor').forEach(post => {
        if(!post.querySelector('* > tag-wrap') && !post.querySelector('* > tag-cell') && !post.querySelector('* > div') && !post.querySelector('* > span')) {
            post.classList.add('no-template');
        }
    });
}

/****** Profile Initialization ******/
function formatName(name) {
    let nameArray = capitalize(name).split(' ').filter(item => item !== '');
    let formattedName = ``;
    if(nameArray.length > 1) {
        let surnames = [...nameArray];
        surnames.shift();
        formattedName = `<b>${nameArray[0]}</b><span>${surnames.join(' ')}</span>`
    } else {
        formattedName = `<b>${nameArray[0]}</b>`;
    }
    return formattedName;
}
function threadBlock(threadLink, title, location, threadDesc, lastPosterId, lastPoster, postDate, status) {
return `<div class="tracker--item ${status}">
        <a href="${threadLink}" class="tracker--title">${title}</a>
        <span class="tracker--info">${threadDesc}</span>
        <span class="tracker--info">posted in ${location}</span>
        <span class="tracker--info">last post by <a href="?showuser=${lastPosterId}">${lastPoster}</a></span>
        <span class="tracker--info">posted ${postDate}</span>
    </div>`;
}
function writeMessage(message) {
    return `<p>${message}</p>`;
}
function clipSpecs(height, weight) {
    if((height !== `<i>No Information</i>` && height !== ``) && (weight !== `<i>No Information</i>` && weight !== ``)) {
        document.querySelector('#clip-specs').insertAdjacentHTML('afterbegin', `<!-- |field_40| -->, <!-- |field_41| -->`);
    } else if ((height !== `<i>No Information</i>` && height !== ``)) {
        document.querySelector('#clip-specs').insertAdjacentHTML('afterbegin', `<!-- |field_40| -->`);
    } else if ((weight !== `<i>No Information</i>` && weight !== ``)) {
        document.querySelector('#clip-specs').insertAdjacentHTML('afterbegin', `<!-- |field_41| -->`);
    } else if ((height === `<i>No Information</i>` || height === ``) && (weight === `<i>No Information</i>` || weight === ``) && (`<!-- |field_75| -->` !==  `Traditional`)) {
        document.querySelector('#clip-specs').insertAdjacentHTML('afterbegin', `<i>No Information</i>`);
    }
}
function clipPlayerAge(bYear, bMonth, age) {
    if(bYear != `` && bYear != `<i>No Information</i>` && bMonth != `` && bMonth != `<i>No Information</i>`) {
        bMonth = setMonth(bMonth);
        if(month < bMonth) {
            playerAge = `${year - 1 - bYear} years old`;
        } else {
            playerAge = `${year - bYear} years old`;
        }
    } else {
        playerAge = `${age} years old`;
    }
    document.querySelector('#clip-player-age').innerHTML = playerAge;
}
function clipAge(jcinkAge, returnYears, manualAge, groupId, returner) {
    let age;
    if(jcinkAge != '<i>No Information</i>' && (returnYears == '<i>No Information</i>' || returnYears == '0')) {
        age = jcinkAge - 16;
    } else if (jcinkAge == '<i>No Information</i>') {
        age = manualAge;
    } else {
        age = jcinkAge - 16 - returnYears;
    }
    document.querySelector('#ageClip').innerHTML = `${age} years old`;

    if(groupId == '17' && (returner != '<i>No Information</i>' || returner != '')){
        document.querySelector('#ageClip').insertAdjacentHTML('beforeend', `<br><i>Dead for ${returnYears} years</i>`);
    }
}
function clipBirthday(jcinkBirthday) {
    let birthday = `<i>No Information</i>`;
    if(jcinkBirthday != '<i>No Information</i>') {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        const birthDate = new Date(Date.parse(jcinkBirthday));
        birthday = `${monthNames[birthDate.getMonth()]} ${birthDate.getDate()}, ${birthDate.getFullYear()}`;
    }
    document.querySelector('#birthdayClip').innerHTML = birthday;
}
function Alpha(arr) {
    let newArr = Array.prototype.slice.call(arr).map(item => {
        if (item.value === '-------------------') {
            return null
        }
        return {
            character: item.innerText.trim().toLowerCase().replace(`» `, ``),
            account: item.value
        }
    }).filter(item => item !== null)
    .sort((a, b) => {
        if(a.character > b.character) {
            return 1;
        } else if (a.character < b.character) {
            return -1;
        } else {
            return 0;
        }
    });
    return newArr;
}
function clearImage() {
    document.querySelectorAll('.profile--sub-image').forEach(image => {
        if(!image.innerHTML) {
            image.parentNode.classList.remove('with-image');
            image.remove();
        }
    });
}
function clipSubaccounts() {
    // SUBACCOUNTS PROFILE DISPLAY SCRIPT (ABC ORDER) by tonya aka wildflower
    let alphaChars = Alpha(document.querySelectorAll('select[name=showuser] option'));
    let siteString = `uploads/totl`;
    alphaChars.forEach(character => {
        let imageDiv = `<div class="profile--sub-image"><img src="https://files.jcink.net/${siteString}/av-${character.account}.jpg" class="jpg"><img src="https://files.jcink.net/${siteString}/av-${character.account}.gif" class="gif"><img src="https://files.jcink.net/${siteString}/av-${character.account}.png" class="png"></div>`;

        let html = `<a class="profile--account" href="?showuser=${character.account}">
            ${imageDiv}
            <div class="profile--account-info">
                <b>${character.character}</b>
                <span>view profile</span>
            </div>
        </a>`;

        document.querySelector('.profile--roster .scroll').insertAdjacentHTML('beforeend', html);
    });
        
    $('.profile--sub-image .jpg').on('error', function() {
        $(this).remove();
        clearImage();
    });
    $('.profile--sub-image .gif').on('error', function() {
        $(this).remove();
        clearImage();
    });
    $('.profile--sub-image .png').on('error', function() {
        $(this).remove();
        clearImage();
    });
}
function defaultGroupImage(custom, groupId) {
    let image = ``;

    if(custom === '' || custom === `<i>No Information</i>`) {
	switch(groupId) {
	    case '14':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_ravenclaw_min.jpg`;
		break;
	    case '13':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_quidditch_min.jpg`;
		break;
	    case '11':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_press_min.jpg`;
		break;
	    case '12':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_ministry_min.jpg`;
		break;
	    case '9':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_hufflepuff_min.jpg`;
		break;
	    case '8':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_hogwarts_min.jpg`;
		break;
	    case '15':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_healers_min.jpg`;
		break;
	    case '7':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_gryffindor_min.jpg`;
		break;
	    case '18':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_entertainment_min.jpg`;
		break;
	    case '6':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_adults_min.jpg`;
		break;
	    case '16':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_slytherin_min.jpg`;
		break;
	    case '17':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_returners_min.jpg`;
		break;
	    case '23':
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_students_min.jpg`;
		break;
	    default:
		image = `https://files.jcink.net/uploads/totl/TOTL23/bg_default_min.jpg`;
		break;
	}
    }

    document.querySelector('.profile--image > img').setAttribute('src', image);
}

/****** Members Initialization ******/
function initMembers() {
    initAccordion();

    document.querySelectorAll('.member--readmore').forEach(button => {
        button.addEventListener('click', e => {
            e.currentTarget.classList.toggle('is-active');
            e.currentTarget.closest('.member').querySelector('.member--overlay').classList.toggle('is-active');
            e.currentTarget.closest('.member').querySelector('.member--info').classList.toggle('effect--image-fade');
        });
    });
}
function formatMemberRow(type, data, extraFilters = '') {
    let mainInfo = ``;
    let tagList = ``;
    let subline = ``;
    if(type === 'character') {
        subline = `Played by ${data.writer.alias}`;
        tagList = `g-${data.universal.groupID} ${data.writer.aliasClass} ${data.character.ageClass} ${data.character.bloodStatus} id-${data.universal.id}`;
        mainInfo = `<div class="member--item">
            <strong>group</strong>
            <span>${data.universal.groupName}</span>
        </div>
        <div class="member--item">
            <strong>pronouns</strong>
            <span>${data.character.pronouns}</span>
        </div>
        <div class="member--item">
            <strong>age</strong>
            <span>${data.character.age} years old</span>
        </div>
        <div class="member--item">
            <strong>blood status</strong>
            <span>${data.character.bloodStatus}</span>
        </div>
        <div class="member--item">
            <strong>relationship</strong>
            <span>${data.character.relationship}</span>
        </div>
        <div class="member--item">
            <strong>overview</strong>
            <span class="triggers">${data.character.overview}</span>
        </div>`;
    } else {
        subline = `AKA ${data.writer.alias}`;
        tagList = `g-${data.universal.groupID} ${data.writer.aliasClass}`;
        mainInfo = `<div class="member--item">
            <strong>group</strong>
            <span>${data.universal.groupName}</span>
        </div>
        <div class="member--item">
            <strong>pronouns</strong>
            <span>${data.writer.pronouns}</span>
        </div>
        <div class="member--item">
            <strong>timezone</strong>
            <span>${data.writer.timezone}</span>
        </div>
        <div class="member--item">
            <strong>contact</strong>
            <span>${data.writer.contact}</span>
        </div>
        <div class="member--item">
            <strong>please avoid</strong>
            <span class="triggers">${data.writer.triggers}</span>
        </div>`;
    }
    return `<div class="members--member grid-item ${type} ${tagList} ${extraFilters}">
        <div class="member">
            <a href="?showuser=${data.universal.id}" class="member--name">${data.universal.name}</a>
            <div class="member--alias">${subline}</div>
            <div class="member--readmore">read </div>
            <div class="member--info">
                <div class="member--overlay">
                    <div class="scroll">
                        ${mainInfo}
                    </div>
                </div>
                <img src="${data.universal.image}" loading="lazy" />
            </div>
        </div>
    </div>`;
}
function populatePage(array) {
    let html = ``;
    let members = [], membersClean = [];

    for (let i = 0; i < array.length; i++) {
        //Make Member Array
        let member = {raw: array[i].writer.alias, clean: array[i].writer.aliasClass};
        if(jQuery.inArray(member.clean, membersClean) == -1 && member.clean != '') {
            membersClean.push(member.clean);
            members.push(member);
        }

        switch(array[i].universal.groupID) {
            //member only
            case 4:
            case 20:
                html += formatMemberRow('writer', array[i], 'active');
                break;
            //depends unsorted
            case 1:
            case 3:
            case 5:
                if(array[i].universal.type === 'character') {
                    html += formatMemberRow('character', array[i], 'pending');
                } else {
                    html += formatMemberRow('writer', array[i], 'pending');
                }
                break;
            //depends sorted
            case 10:
            case 19:
            case 21:
                if(array[i].universal.type === 'character') {
                    html += formatMemberRow('character', array[i], 'inactive');
                } else {
                    html += formatMemberRow('writer', array[i], 'inactive');
                }
                break;
            //character only
            default: 
                html += formatMemberRow('character', array[i], 'active');
                break;
        }
    }
    document.querySelector('#members--rows').insertAdjacentHTML('beforeend', html);


    //sort member array
    members.sort((a, b) => {
        if(a.clean < b.clean) {
            return -1;
        } else if (a.clean > b.clean) {
            return 1;
        } else {
            return 0;
        }
    });

    //Append Arrays
    members.forEach(member => {
        document.querySelector('.members--filter-group[data-filter-group="member"]').insertAdjacentHTML('beforeend', `<label><input type="checkbox" value=".${member.clean}"/>${member.raw}</label>`);
    });
}
function setCustomFilter() {
    //get search value
    qsRegex = document.querySelector(typeSearch).value;
    
    //add show class to all items to reset
    elements.forEach(el => el.classList.add(visible));
    
    //filter by nothing
    let searchFilter = '';
    
    //check each item
    elements.forEach(el => {
        let name = el.querySelector(memName).textContent;
        if(!name.toLowerCase().includes(qsRegex)) {
            el.classList.remove(visible);
            searchFilter = `.${visible}`;
        }
    });

    let filterGroups = document.querySelectorAll(filterGroup);
    let groups = [];
    let checkFilters;
    filterGroups.forEach(group => {
        let filters = [];
        group.querySelectorAll('label.is-checked input').forEach(filter => {
            if(filter.value) {
                filters.push(filter.value);
            }
        });
        groups.push({group: group.dataset.filterGroup, selected: filters});
    });

    groups.forEach(group => {
        let tagString = group.selected.join('_');
        appendSearchQuery(group.group, tagString);
    });

    let filterCount = 0;
    let comboFilters = [];
    groups.forEach(group => {
        // skip to next filter group if it doesn't have any values
        if ( group.selected.length > 0 ) {
            if ( filterCount === 0 ) {
                // copy groups to comboFilters
                comboFilters = group.selected;
            } else {
                var filterSelectors = [];
                var groupCombo = comboFilters;
                // merge filter Groups
                for (var k = 0; k < group.selected.length; k++) {
                    for (var j = 0; j < groupCombo.length; j++) {
                        //accommodate weirdness with object vs not
                        if(groupCombo[j].selected) {
                            if(groupCombo[j].selected != group.selected[k]) {
                                filterSelectors.push( groupCombo[j].selected + group.selected[k] );
                            }
                        } else if (!groupCombo[j].selected && group.selected[k]) {
                            if(groupCombo[j] != group.selected[k]) {
                                filterSelectors.push( groupCombo[j] + group.selected[k] );
                            }
                        }
                    }
                }
                // apply filter selectors to combo filters for next group
                comboFilters = filterSelectors;
            }
            filterCount++;
        }
    });
    
    //set filter to blank
    let filter = [];
    //check if it's only search
    if(qsRegex.length > 0 && comboFilters.length === 0) {
        filter = [`.${visible}`];
    }
    //check if it's only checkboxes
    else if(qsRegex.length === 0 && comboFilters.length > 0) {
        let combos = comboFilters.join(',').split(',');
        filter = [...combos];
    }
    //check if it's both
    else if (qsRegex.length > 0 && comboFilters.length > 0) {
        let dualFilters = comboFilters.map(filter => filter + `.${visible}`);
        filter = [...dualFilters];
    }

    //join array into string
    filter = filter.join(', ');
        
    //render isotope
    $container.isotope({
        filter: filter,
    });
    $container.isotope('layout');
}
function debounce(fn, threshold) {
    var timeout;
    return function debounced() {
        if (timeout) {
        clearTimeout(timeout);
        }

        function delayed() {
        fn();
        timeout = null;
        }
        setTimeout(delayed, threshold || 100);
    };
}

/****** Webpage Initialization ******/
function initWebpages() {
    //remove staff for non-staff
    if(!document.querySelector('body').classList.contains('g-4')) {
        document.querySelectorAll('.staffOnly').forEach(item => item.remove());
    }

    //remove loading screen
    document.querySelector('body').classList.remove('loading');
    document.querySelector('#loading').remove();
    initTabs(true, '.webpage', '.webpage--menu', '.webpage--content', 'is-active', '.tab-category', ['.webpage--menu .accordion--trigger', '.webpage--menu .accordion--content', '.webpage--menu .accordion--content a', '.webpage--content .tab-category', '.webpage--content .tab-category tag-tab']);

    //accordions
    initAccordion();
}
function initJobsPage() {
    //remove staff for non-staff
    if(!document.querySelector('body').classList.contains('g-4')) {
        document.querySelectorAll('.staffOnly').forEach(item => item.remove());
    }

    //remove loading screen
    document.querySelector('body').classList.remove('loading');
    document.querySelector('#loading').remove();
    initTabs(true, '.webpage', '.webpage--menu', '.webpage--content', 'is-active', null, ['.webpage--menu a', '.webpage--content tag-tab']);

    //accordions
    initAccordion();
}

/****** UCP ******/
function initUCPMenu() {
    document.querySelector('#ucpmenu').innerHTML = `<div class="ucp--menu-inner">
        <div class="accordion scroll">
            ${typeof localUCPLinks !== 'undefined' ? localUCPLinks : jcinkUCPLinks}
        </div>
    </div>`;

    initAccordion();
    initAccordionActive();

    let textNodes = getAllTextNodesArray(document.querySelectorAll('#UserCP.code-01 #ucpcontent td.pformleft'));
    textNodes.forEach(node => {
        const paragraph = document.createElement('span');
        node.after(paragraph);
        paragraph.appendChild(node);
    });
}
function initUCPEdit() {
    const toggleFields = [document.querySelector('#field_74_input'), document.querySelector('#field_75_input')];
	$('#field-birthday').insertAfter('#field_34');
      
    cpShift();
        
    toggleFields.forEach(toggle => {
        toggle.addEventListener('change', () => {
            cpShift();
        });
    });

    document.querySelectorAll('#ucpcontent form[name="theForm"] input[type="text"]').forEach(input => {
        let label = input.getAttribute('id');
        if(document.querySelector('label[for="' + label + '"]')) {
                input.setAttribute('placeholder', document.querySelector('label[for="' + label + '"]').innerText.toLowerCase());
        }
    });

    document.querySelectorAll('#ucpcontent form[name="theForm"] textarea').forEach(input => {
        let label = input.getAttribute('id');
        if(document.querySelector('label[for="' + label + '"]')) {
                input.setAttribute('placeholder', document.querySelector('label[for="' + label + '"]').innerText.toLowerCase());
        }
    });
}
function cpShift() {
	let appType = document.querySelector('#field_75_input').value,
    account = document.querySelector('#field_74_input').value,
    showFields = [],
    hideFields = [],
    showHeaders = allHeaders;

    if(account == 'char') {

        if(appType == 'trad') {
            showFields = charAll.concat(charTrad).concat(hasFreeform);
            hideFields = charBasic;
            showHeaders = showHeaders.concat(tradHeaders);
        }
        else if(appType == 'sim') {
            showFields = charAll.concat(charBasic).concat(hasFreeform);
            hideFields = charTrad;
            showHeaders = showHeaders.concat(simHeaders);
        }
        else if(appType == 'bas') {
            showFields = charAll.concat(charBasic);
            hideFields = charTrad.concat(hasFreeform);
            showHeaders = showHeaders.concat(basicHeaders);
        }
        else {
            showFields = [];
            hideFields = charAll.concat(charTrad).concat(charBasic).concat(hasFreeform);
        }

        showHeaders = showHeaders.concat(charHeaders);
        adjustCP(showFields, hideFields, showHeaders);

    } else {
        showFields = [];
        hideFields = charAll.concat(charTrad).concat(charBasic).concat(hasFreeform);
        adjustCP(showFields, hideFields, showHeaders);
    }
}
function adjustCP(show, hide, headers) {
    show.forEach(field => {
        showAccField(field);
    });
    hide.forEach(field => {
        hideAccField(field);
    });
    document.querySelectorAll('.ucp--header').forEach(header => {
        header.remove();
    });
    headers.forEach(header => {
        insertCPHeader(header['title'], header['insertBefore']);
    });
}
function hideAccField(field) {
	if(document.querySelector(field)) {
		document.querySelector(field).classList.add('hide');
	}
}
function showAccField(field) {
	if(document.querySelector(field)) {
		document.querySelector(field).classList.remove('hide');
	}
}
function insertCPHeader (title, field, identifier) {
	$(field).before(`<tr class="pformstrip ucp--header"><td>${title}</td></tr>`);
}
function initAccordionActive() {
    if(pageType === 'Msg') {
        document.querySelectorAll('[data-category="messages"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'UserCP' && (pageClasses.contains('code-alerts') || pageClasses.contains('code-50') || pageClasses.contains('code-26'))) {
        document.querySelectorAll('[data-category="tracking"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'UserCP' && (pageClasses.contains('code-alerts_settings') || pageClasses.contains('code-04') || pageClasses.contains('code-02'))) {
        document.querySelectorAll('[data-category="settings"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'UserCP') {
        document.querySelectorAll('[data-category="account"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'store' && (pageClasses.contains('store-inventory') || pageClasses.contains('store-donate_money') || pageClasses.contains('store-donate_item'))) {
        document.querySelectorAll('[data-category="personal"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'store' && (pageClasses.contains('store-fine') || pageClasses.contains('store-do_edit_points') || pageClasses.contains('store-edit_points') || pageClasses.contains('store-do_staff_inventory') || pageClasses.contains('store-edit_inventory'))) {
        document.querySelectorAll('[data-category="staff"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'store' && pageClasses.contains('store-home')) {
        document.querySelectorAll('[data-category="home"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'store') {
        document.querySelectorAll('[data-category="shop"]').forEach(item => item.classList.add('is-active'));
    }
    if(window.location.search) {
        if(document.querySelector(`#ucpmenu a[href="${window.location.search}"]`)) {
	    document.querySelector(`#ucpmenu a[href="${window.location.search}"]`).classList.add('is-active');
	}
    } else if (document.querySelector(`#ucpmenu a[href="${window.location.pathname.split('/usercp/')[1]}"]`)) {
        document.querySelector(`#ucpmenu a[href="${window.location.pathname.split('/usercp/')[1]}"]`).classList.add('is-active');
    } else if (document.querySelector(`#ucpmenu a[href="${window.location.pathname.split('/store/')[1]}"]`)) {
        document.querySelector(`#ucpmenu a[href="${window.location.pathname.split('/store/')[1]}"]`).classList.add('is-active');
    }
}

/****** Store ******/
function initStoreMenu() {
    document.querySelector('#ucpmenu').innerHTML = `<div class="ucp--menu-inner">
        <div class="accordion scroll">
            ${typeof localStoreLinks !== 'undefined' ? localStoreLinks : jcinkStoreLinks}
        </div>
    </div>`;

    initAccordion();
    initAccordionActive();
}