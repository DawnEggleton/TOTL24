/** auto-tracker code by FizzyElf - https://fizzyelf.jcink.net **/
async function FillTracker(username, params = {}) {

    /***  CONFIGURATION AREA ***/
    const config = {
      includedforums: (params.includeCategoryIds || []).map(x => "c_" + x).concat(params.includeForumIds || []),
      historyforums: params.historyForumNames || [],
      historyforumids: params.historyForumIds || [],
      commforums: params.commForumNames || [],
      commforumids: params.commForumIds || [],
      commhistoryforums: params.commHistoryForumNames || [],
      commhistoryforumids: params.commHistoryForumIds || [],
      auforums: params.auForumNames || [],
      auforumids: params.auForumIds || [],
      auhistoryforums: params.auHistoryForumNames || [],
      auhistoryforumids: params.auHistoryForumIds || [],
      devforums: params.devForumNames || [],
      devforumids: params.devForumIds || [],
      reqforums: params.reqForumNames || [],
      reqforumids: params.reqForumIds || [],
      socialforums: params.socialForumNames || [],
      socialforumids: params.socialForumIds || [],
      ignoreforums: params.ignoreForumNames || [],
      ignoreforumids: params.ignoreForumIds || [],
      lockedclass: params.lockedMacroIdentifier || "[title=Closed]",
      lockedforums: params.archiveForumNames || [],
      lockedforumids: params.archiveForumIds || [],
      indicators: params.indicators || ['<span style="font-family: roboto, verdana, arial, sans">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“</span>', '<span style="font-family: roboto, verdana, arial, sans">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤</span>'],
      separator: params.separator || "|",
      username: username.replace(/&#([0-9]+);/g, (m, p1) => String.fromCharCode(p1)),
      trackerwrap: params.thisTracker || $('#clip-active .scroll'),
      historywrap: params.thisHistory || $('#clip-history .scroll'),
      commwrap: params.thisCommTracker || $('#clip-comm .scroll'),
      commhistorywrap: params.thisCommHistoryTracker || $('#clip-comm .scroll'),
      auwrap: params.thisauTracker || $('#clip-au .scroll'),
      auhistorywrap: params.thisauTracker || $('#clip-au .scroll'),
      devwrap: params.thisDevTracker || $('#clip-dev .scroll'),
      reqwrap: params.thisReqTracker || $('#clip-req .scroll'),
      socialwrap: params.thisSocialTracker || $('#clip-social .scroll'),
      pagelimit: params.pageLimit || 5,
      previousposters: params.previousPosters || {},
      lockedregex: (params.archiveForumRegex)?  RegExp(params.archiveForumRegex) : /archive/i ,
      closedthreads: (params.completedThreads) || []
    }
    if (!config.includedforums.length) config.includedforums.push("all");
    /*** END CONFIGURATION ***/
    if (/^[-\w _\d]+$/.test(params.indicators[0])) {
    params.indicators[0] = `<i class="${params.indicators[0]}"></i>`
    }
    if (/^[-\w _\d]+$/.test(params.indicators[1])) {
      params.indicators[1] = `<i class="${params.indicators[1]}"></i>`
    }

    //set up html wrappers to minimize code repetition
    function writeMessage(message) {
        return `<div class="tracker--message">${message}</div>`;
    }
    function threadBlock(link, title, location, description, posterID, poster, date, status) {
        return `<div class="tracker--item ${status}">
            <a href="${link}" class="tracker--title">${title}</a>
            <span class="tracker--info">${description}</span>
            <span class="tracker--info">posted in ${location}</span>
            <span class="tracker--info">last post written by <a href="${posterID}">${poster}</a></span>
            <span class="tracker--info">posted ${date}</span>
        </div>`;
    }
  
    /***  RUN THE SEARCH ***/
  
    let href = `https://totl.jcink.net/index.php?act=Search&CODE=01&nomobile=1`;
    let data = '';
    try {
      //console.log(`fetching ${href}`);
      data = await $.post(href, {
        keywords: "",
        namesearch: config.username,
        forums: config.includedforums,
        searchsubs: "1",
        prune: "0",
        prune_type: "newer",
        sort_key: "last_post",
        sort_order: "desc",
        search_in: "posts",
        result_type: "topics",
      });
      //console.log('success.');
    } catch (err) {
      console.log(`Ajax error loading page: ${href} - ${err.status} ${err.statusText}`);
      config.trackerwrap.append(writeMessage('Search failed.'));
      config.historywrap.append(writeMessage('Search failed.'));
      config.commwrap.append(writeMessage('Search failed.'));
      config.auwrap.append(writeMessage('Search failed.'));
      config.devwrap.append(writeMessage('Search failed.'));
      config.reqwrap.append(writeMessage('Search failed.'));
      config.socialwrap.append(writeMessage('Search failed.'));
      return;
    }
    doc = new DOMParser().parseFromString(data, 'text/html');
  
    let meta = $('meta[http-equiv="refresh"]', doc);
    if (meta.length) {
      href = meta.attr('content').substr(meta.attr('content').indexOf('=') + 1) + '&st=0';
      //.log('sessionid = ' + href.match(/&searchid=([a-zA-Z0-9]+)&/)[1]);
      //console.log('search = ' + href);
    } else {
      let boardmessage = $('#board-message .tablefill .postcolor', doc).text();
      config.trackerwrap.append(writeMessage(boardmessage));
      config.historywrap.append(writeMessage(boardmessage));
      config.commwrap.append(writeMessage(boardmessage));
      config.auwrap.append(writeMessage(boardmessage));
      config.devwrap.append(writeMessage(boardmessage));
      config.reqwrap.append(writeMessage(boardmessage));
      config.socialwrap.append(writeMessage(boardmessage));
      return;
    }
  
    await parseResults(href, config, 0);
    
  }
  
  
  
  parseResults = async (searchlink, config, page) => {
    let doc;
    searchlink = searchlink.replace(/&st=\d+/, `&st=${page * 25}`);
    let data = '';
    try {
      //console.log(`fetching ${searchlink}`);
      data = await $.get(searchlink);
      //console.log('success.');
    } catch (err) {
      console.log(`Ajax error loading page: ${searchlink} - ${err.status} ${err.statusText}`);
      console.log(err)
      config.trackerwrap.append(writeMessage('Search failed.'));
      return;
    }
    doc = new DOMParser().parseFromString(data, 'text/html');
  
    $('#search-topics .tablebasic > tbody > tr', doc).each(function (i, e) {
      if (i > 0) {
        const cells = $(e).children('td');
        const location = $(cells[3]).text();
        const location_id = $(cells[3]).find('a').attr('href').match(/showforum=([^&]+)&?/)[1]
        const threadLink = $(cells[7]).children('a').attr('href');
        const thread_id = threadLink.match(/showtopic=([^&]+)&?/)[1];
        if (!config.ignoreforums.includes(location) && !config.ignoreforumids.includes(location_id)) {
          const locked = $(cells[0]).find(`${config.lockedclass}`).length 
                        || config.lockedforums.includes(location) 
                        || config.lockedforumids.includes(location_id) 
                        || config.lockedregex.test(location)
                        || config.closedthreads.includes(thread_id);
          const title = $(cells[2]).find('td:nth-child(2) > a').first().text();
          const threadDesc = $(cells[2]).find('.desc').text();
          const history = config.historyforums.includes(location) || config.historyforumids.includes(location_id);
          const comm = config.commforums.includes(location) || config.commforumids.includes(location_id);
      const commhistory = config.commhistoryforums.includes(location) || config.commhistoryforumids.includes(location_id);
          const au = config.auforums.includes(location) || config.auforumids.includes(location_id);
      const auhistory = config.auhistoryforums.includes(location) || config.auhistoryforumids.includes(location_id);
          const dev = config.devforums.includes(location) || config.devforumids.includes(location_id);
          const req = config.reqforums.includes(location) || config.reqforumids.includes(location_id);
          const social = config.socialforums.includes(location) || config.socialforumids.includes(location_id);
          const lastPoster = $(cells[7]).find('a[href*=showuser]').text().trim().replace(/&#([0-9]+);/g, (m, p1) => String.fromCharCode(p1));
          const lastPosterId = $(cells[7]).find('a[href*=showuser]').attr('href');
          let myturn = (config.username == lastPoster) ? 'Caught Up' : 'Owing';
          if (config.previousposters[thread_id]) {
            myturn = (lastPoster == config.previousposters[thread_id].replace(/&#([0-9]+);/g, (m, p1) => String.fromCharCode(p1))) ? 'Owing' : 'Caught Up';
          }
          const symbol = (myturn == 'Caught Up') ? config.indicators[0] : config.indicators[1];
  
          let postDate = $(cells[7]).html();
          postDate = postDate.substr(0, postDate.indexOf('<br>'));
          const sep = (threadDesc) ? config.separator : '';
          
          if (history) {
            let thread = threadBlock(threadLink, title, location, threadDesc, lastPosterId, lastPoster, postDate, 'closed');
            config.historywrap.append(thread);
          } else if (comm) {
            let thread = threadBlock(threadLink, title, location, threadDesc, lastPosterId, lastPoster, postDate, myturn.replace(/ /g, '').toLowerCase());
            config.commwrap.append(thread);
          } else if (commhistory) {
            let thread = threadBlock(threadLink, title, location, threadDesc, lastPosterId, lastPoster, postDate, 'closed');
            config.commhistorywrap.append(thread);
          } else if (au) {
            let thread = threadBlock(threadLink, title, location, threadDesc, lastPosterId, lastPoster, postDate, myturn.replace(/ /g, '').toLowerCase());
            config.auwrap.append(thread);
          } else if (auhistory) {
            let thread = threadBlock(threadLink, title, location, threadDesc, lastPosterId, lastPoster, postDate, 'closed');
            config.auhistorywrap.append(thread);
          } else if (dev) {
            let thread = threadBlock(threadLink, title, location, threadDesc, lastPosterId, lastPoster, postDate, 'dev');
            config.devwrap.append(thread);
          } else if (req) {
            let thread = threadBlock(threadLink, title, location, threadDesc, lastPosterId, lastPoster, postDate, 'request');
            config.reqwrap.append(thread);
          } else if (social) {
            let thread = threadBlock(threadLink, title, location, threadDesc, lastPosterId, lastPoster, postDate, 'social');
            config.socialwrap.append(thread);
          } else {
            let thread = threadBlock(threadLink, title, location, threadDesc, lastPosterId, lastPoster, postDate, myturn.replace(/ /g, '').toLowerCase());
            config.trackerwrap.append(thread);
          }
        }
      }
  
    });
  
    if ($('#search-topics .tablebasic > tbody > tr', doc).length == 26 && page < config.pagelimit) {
      page = page + 1;
      await parseResults(searchlink, config, page)
    } else {
      if (!config.trackerwrap.children().length) {
        config.trackerwrap.append(writeMessage('No threads.'));
      }
      if (!config.historywrap.children().length) {
        config.historywrap.append(writeMessage('No threads.'));
      }
      if (!config.commwrap.children().length && !config.commhistorywrap.children().length) {
        config.commwrap.append(writeMessage('No threads.'));
      }
      if (!config.auwrap.children().length && !config.auhistorywrap.children().length) {
        config.auwrap.append(writeMessage('No threads.'));
      }
      if (!config.devwrap.children().length) {
        config.devwrap.append(writeMessage('No threads.'));
      }
      if (!config.reqwrap.children().length) {
        config.reqwrap.append(writeMessage('No threads.'));
      }
      if (!config.socialwrap.children().length) {
        config.socialwrap.append(writeMessage('No threads.'));
      }
    }
  }