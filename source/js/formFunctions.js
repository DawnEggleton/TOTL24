function openHelp(e) {
    e.classList.toggle('show');
    e.parentNode.parentNode.querySelector('.help').classList.toggle('show');
}
function setGroup(id) {
    let form = document.querySelector('#newsort');
    switch (id) {
        case '7':
        case '9':
        case '14':
        case '16':
            form.querySelectorAll('.ifStudent').forEach(field => field.classList.remove('hide'));
            form.querySelectorAll('.ifAdult, .ifJob, .ifUni, .ifMiscStudent').forEach(field => field.classList.add('hide'));
            break;
        case '23':
            form.querySelectorAll('.ifStudent, .ifCore, .ifStart, .ifElec, .ifUpper, .ifLeadershipPossible, .ifHogwartsQuidditch, .ifLeadership, .ifAdult').forEach(field => field.classList.add('hide'));
            form.querySelectorAll('.ifMiscStudent').forEach(field => field.classList.remove('hide'));
            break;
        case '17':
            form.querySelectorAll('.ifStudent, .ifCore, .ifStart, .ifElec, .ifUpper, .ifLeadershipPossible, .ifHogwartsQuidditch, .ifLeadership').forEach(field => field.classList.add('hide'));
            form.querySelectorAll('.ifAdult').forEach(field => field.classList.remove('hide'));
            let canon = document.querySelector('#sort-canon');
            setShowHide(canon.options[canon.selectedIndex].value, '.ifReturn');
            break;
        case '18':
        case '15':
        case '8':
        case '12':
        case '11':
        case '13':
        case '6':
            form.querySelectorAll('.ifStudent, .ifCore, .ifStart, .ifElec, .ifUpper, .ifLeadershipPossible, .ifHogwartsQuidditch, .ifLeadership').forEach(field => field.classList.add('hide'));
            form.querySelectorAll('.ifAdult').forEach(field => field.classList.remove('hide'));
            break;
        default:
            form.querySelectorAll('.ifAdult, .ifJob, .ifUni, .ifStudent, .ifCore, .ifStart, .ifElec, .ifUpper, .ifLeadershipPossible, .ifHogwartsQuidditch, .ifLeadership').forEach(field => field.classList.add('hide'));
            break;
    }
}
function setShowHide(value, classList) {
    let form = document.querySelector('#newsort');
    switch (value) {
        case 'y':
            form.querySelectorAll(classList).forEach(field => field.classList.remove('hide'));
            break;
        default:
            form.querySelectorAll(classList).forEach(field => field.classList.add('hide'));
            break;
    }
}
function setCheckShowHide(value, classList, form) {
    switch (value) {
        case true:
            form.querySelectorAll(classList).forEach(field => field.classList.remove('hide'));
            break;
        default:
            form.querySelectorAll(classList).forEach(field => field.classList.add('hide'));
            break;
    }
}
function addJobFields(i, formType) {
    let html = `<label class="form--job-section">
        <strong>Job Section</strong>
        <select name="${formType}-jobsection-${i}" id="${formType}-jobsection-${i}">
            <option value="">(select)</option>
            <option value="hogwarts">Hogwarts Castle</option>
            <option value="ministry">Ministry of Magic</option>
            <option value="mungos">St. Mungo's</option>
            <option value="sports">Professional Sports</option>
            <option value="prophet">The Daily Prophet</option>
            <option value="diagon">Diagon Alley</option>
            <option value="horizon">Horizon Alley</option>
            <option value="knockturn">Knockturn Alley</option>
            <option value="mythic">Mythic Alley</option>
            <option value="wizardlondon">Wizarding London (Other)</option>
            <option value="mugglelondon">Muggle London (Other)</option>
            <option value="hogsmeade">Hogsmeade</option>
            <option value="ilkley">Ilkley</option>
            <option value="elsewhere">Elsewhere</option>
            <option value="selfemployed">Self-Employed</option>
        </select>
    </label>
    <label class="form--job-sub-section">
        <strong>
            Job Sub-Section
            <button onclick="openHelp(this)" type="button">
                <i class="fa-solid fa-circle-question"></i>
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
        </strong>
        <i class="help">Equivalent to the grouping underneath the main tab. For example, in the Ministry, these are overarching departments. In Diagon Alley, these are individual businesses. For Professional sports players, ensure it mentions the league/level, if applicable, as well as the sport they play (e.g., British &amp; Irish Quidditch League or International Soccer). REQUIRED unless self-employed.</i>
        <input type="text" name="${formType}-jobsubsection-${i}" id="${formType}-jobsubsection-${i}" placeholder="Job Subsection">
    </label>
    <label class="form--job-line1">
        <strong>
            Job Info - Line 1
            <button onclick="openHelp(this)" type="button">
                <i class="fa-solid fa-circle-question"></i>
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
        </strong>
        <i class="help">Unless one of the following applies, this line is reserved for the job title/position of your character. Exceptions are: for Ministry personnel, if they are part of a specific sub-division or team under the overall department (e.g., the Hitwizard Team within Magical Law Enforcement), this team label goes here; for Hogwarts teaching staff, place their speciality; for Quidditch players, please name their team; or, if they are self-employed and have a specific business name. In these instances, place the job title/position in <b>line 2</b>.</i>
        <input type="text" name="${formType}-jobline1-${i}" id="${formType}-jobline1-${i}" placeholder="Job Info - Line 1, see help for specifics">
    </label>
    <label class="form--job-line2">
        <strong>
            Job Info - Line 2
            <button onclick="openHelp(this)" type="button">
                <i class="fa-solid fa-circle-question"></i>
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
        </strong>
        <i class="help">Not applicable for characters who are not one of the exception in Line 1 above or are house-specific Hogwarts Staff (e.g., a House Parent). For those exceptions: for Ministry personnel or self-employed individuals, place their job title/position; for Hogwarts teaching staff, place the years they teach (e.g, Years One to Three); for Quidditch, use their position on the team. Additionally, if your character is Hogwarts Staff and is house-specific, please place the house affiliation.</i>
        <input type="text" name="${formType}-jobline2-${i}" id="${formType}-jobline2-${i}" placeholder="Job Info - Line 2, see help for specifics">
    </label>`;
    return html;
}
function setHogwartsYear(year, group) {
    if(group.options[group.selectedIndex].value !== '23') {
        let reqClip = document.querySelector('.form--reqclass-clip.form--sort');
        let elecClip = document.querySelector('.form--elecclass-clip.form--sort');
        switch(year) {
            case '1':
            case '2':
                document.querySelectorAll('.ifElec').forEach(field => field.classList.add('hide'));
                document.querySelectorAll('.ifLeadershipPossible').forEach(field => field.classList.add('hide'));
                reqClip.innerHTML = '';
                elecClip.innerHTML = '';
                reqClip.insertAdjacentHTML('beforeend', addStartClasses('sort'));
                reqClip.insertAdjacentHTML('beforeend', addCoreClasses('sort'));
                break;
            case '3':
            case '4':
                document.querySelectorAll('.ifElec').forEach(field => field.classList.remove('hide'));
                document.querySelectorAll('.ifLeadershipPossible').forEach(field => field.classList.add('hide'));
                reqClip.innerHTML = '';
                elecClip.innerHTML = '';
                reqClip.insertAdjacentHTML('beforeend', addCoreClasses('sort'));
                elecClip.insertAdjacentHTML('beforeend', addElecClasses(4, 2, false, 'sort'));
                break;
            case '5':
                document.querySelectorAll('.ifElec').forEach(field => field.classList.remove('hide'));
                document.querySelectorAll('.ifLeadershipPossible').forEach(field => field.classList.remove('hide'));
                reqClip.innerHTML = '';
                elecClip.innerHTML = '';
                reqClip.insertAdjacentHTML('beforeend', addCoreClasses('sort'));
                elecClip.insertAdjacentHTML('beforeend', addElecClasses(4, 2, false, 'sort'));
                break;
            case '6':
            case '7':
                document.querySelectorAll('.ifElec').forEach(field => field.classList.remove('hide'));
                document.querySelectorAll('.ifLeadershipPossible').forEach(field => field.classList.remove('hide'));
                reqClip.innerHTML = '';
                elecClip.innerHTML = '';
                elecClip.insertAdjacentHTML('beforeend', addElecClasses(8, 4, true, 'sort'));
                break;
            default:
                break;
        }
    }
}
function setHogwartsYearUpdate(year) {
    let reqClip = document.querySelector('.form--reqclass-clip.form--update');
    let elecClip = document.querySelector('.form--elecclass-clip.form--update');
    switch(year) {
        case '1':
        case '2':
            document.querySelectorAll('.ifElec-Change').forEach(field => field.classList.add('hide'));
            reqClip.innerHTML = '';
            elecClip.innerHTML = '';
            reqClip.insertAdjacentHTML('beforeend', addStartClasses('update'));
            reqClip.insertAdjacentHTML('beforeend', addCoreClasses('update'));
            break;
        case '3':
        case '4':
        case '5':
            document.querySelectorAll('.ifElec-Change').forEach(field => field.classList.remove('hide'));
            reqClip.innerHTML = '';
            elecClip.innerHTML = '';
            reqClip.insertAdjacentHTML('beforeend', addCoreClasses('update'));
            elecClip.insertAdjacentHTML('beforeend', addElecClasses(4, 2, false, 'update'));
            break;
        case '6':
        case '7':
            document.querySelectorAll('.ifElec-Change').forEach(field => field.classList.remove('hide'));
            reqClip.innerHTML = '';
            elecClip.innerHTML = '';
            elecClip.insertAdjacentHTML('beforeend', addElecClasses(8, 4, true,'update'));
            break;
        default:
            break;
    }
}
function addStartClasses(formType) {
    let html = `
    <h2 class="fullWidth">Introductory Classes</h2>
    <label class="required">
        <strong>Culture Class</strong>
        <select name="${formType}-culture" id="${formType}-culture">
        <option value="">(select)</option>
        <option value="muggle">Muggle Studies</option>
        <option value="wizarding">Wizarding Culture</option>
        </select>
    </label>
    <label class="required">
        <strong>Culture Grade</strong>
        <select name="${formType}-culturegrade" id="${formType}-culturegrade">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>
    <label class="required">
        <strong>Literacy</strong>
        <select name="${formType}-literacy" id="${formType}-literacy">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>
    <label class="required">
        <strong>Magical Theory</strong>
        <select name="${formType}-magicaltheory" id="${formType}-magicaltheory">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>
    <label class="required">
        <strong>Maths</strong>
        <select name="${formType}-maths" id="${formType}-maths">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>`;
    return html;
}
function addCoreClasses(formType) {
    let html = `
    <h2 class="fullWidth">Core Classes</h2>
    <label class="required">
        <strong>Astronomy</strong>
        <select name="${formType}-astronomy" id="${formType}-astronomy">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>
    <label class="required">
        <strong>Charms</strong>
        <select name="${formType}-charms" id="${formType}-charms">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>
    <label class="required">
        <strong>Defence Against the Dark Arts</strong>
        <select name="${formType}-dada" id="${formType}-dada">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>
    <label class="required">
        <strong>Games</strong>
        <select name="${formType}-games" id="${formType}-games">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>
    <label class="required">
        <strong>Herbology</strong>
        <select name="${formType}-herbology" id="${formType}-herbology">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>
    <label class="required">
        <strong>History of Magic</strong>
        <select name="${formType}-historyofmagic" id="${formType}-historyofmagic">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>
    <label class="required">
        <strong>Potions</strong>
        <select name="${formType}-potions" id="${formType}-potions">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>
    <label class="required">
        <strong>Transfiguration</strong>
        <select name="${formType}-transfiguration" id="${formType}-transfiguration">
        <option value="">(select)</option>
        <option value="o">Outstanding</option>
        <option value="e">Exceeds Expectations</option>
        <option value="a">Acceptable</option>
        <option value="p">Poor</option>
        <option value="d">Dreadful</option>
        <option value="t">Troll</option>
        </select>
    </label>`;
    return html;
}
function addElecClasses(count, min, upper, formType) {
    let html = ``;
    for(let i = 0; i < count; i++) {
        if (i < min) {
            html += `<label class="required">`;
        } else {
            html += `<label>`;
        }
        let options = `<option value="">(select)</option>
        <option value="runes">Ancient Runes</option>
        <option value="arithmancy">Arithmancy</option>
        <option value="art">Art</option>
        <option value="comc">Care of Magical Creatures</option>
        <option value="divination">Divination</option>
        <option value="magicaltheory">Magical Theory</option>
        <option value="mugglestudies">Muggle Studies</option>
        <option value="music">Music</option>`;
        if(upper) {
            options = `<option value="">(select)</option>
            <option value="alchemy">Alchemy</option>
            <option value="runes">Ancient Runes</option>
            <option value="ancientstudies">Ancient Studies</option>
            <option value="arithmancy">Arithmancy</option>
            <option value="art">Art</option>
            <option value="astronomy">Astronomy</option>
            <option value="comc">Care of Magical Creatures</option>
            <option value="charms">Charms</option>
            <option value="dada">Defence Against the Dark Arts</option>
            <option value="divination">Divination</option>
            <option value="games">Games</option>
            <option value="ghoulstudies">Ghoul Studies</option>
            <option value="herbology">Herbology</option>
            <option value="historyofmagic">History of Magic</option>
            <option value="magicaltheory">Magical Theory</option>
            <option value="mugglestudies">Muggle Studies</option>
            <option value="music">Music</option>
            <option value="potions">Potions</option>
            <option value="transfiguration">Transfiguration</option>
            <option value="xylomancy">Xylomancy</option>`;
        }
        html += `
            <strong>Course</strong>
            <select name="${formType}-elec${i}" id="${formType}-elec${i}">${options}</select>
        </label>`;
        if (i < min) {
            html += `<label class="required">`;
        } else {
            html += `<label>`;
        }
        html += `
            <strong>Grade</strong>
            <select name="${formType}-elec${i}grade" id="${formType}-elec${i}grade">
            <option value="">(select)</option>
            <option value="o">Outstanding</option>
            <option value="e">Exceeds Expectations</option>
            <option value="a">Acceptable</option>
            <option value="p">Poor</option>
            <option value="d">Dreadful</option>
            <option value="t">Troll</option>
            </select>
        </label>`;
    }
    return html;
}
function setUpdateOptions() {
    let faceChange = document.querySelector('#choice-face').checked;
    let addUni = document.querySelector('#choice-newuni').checked;
    let addAbility = document.querySelector('#choice-ability').checked;
    let addJobs = document.querySelector('#choice-newjob').checked;
    let changeJobs = document.querySelector('#choice-changejob').checked;
    let removeJobs = document.querySelector('#choice-removejob').checked;
    let changeClasses = document.querySelector('#choice-classes').checked;
    let changeBasicYear = document.querySelector('#choice-basicyear').checked;
    let changeQuid = document.querySelector('#choice-quidditch').checked;
    let changeLead = document.querySelector('#choice-leadership').checked;

    setCheckShowHide(faceChange, '.ifFace-Change', document.querySelector('#newedit'));
    setCheckShowHide(addUni, '.ifUni-Change', document.querySelector('#newedit'));
    setCheckShowHide(addAbility, '.ifAbSp-Add', document.querySelector('#newedit'));
    setCheckShowHide(addJobs, '.ifJob-Add', document.querySelector('#newedit'));
    setCheckShowHide(changeJobs, '.ifJob-Change', document.querySelector('#newedit'));
    setCheckShowHide(removeJobs, '.ifJob-Remove', document.querySelector('#newedit'));
    setCheckShowHide(changeClasses, '.ifStudent-Change', document.querySelector('#newedit'));
    setCheckShowHide(changeBasicYear, '.ifMiscStudent', document.querySelector('#newedit'));
    setHogwartsYearUpdate(document.querySelector('#update-hwyear').options[document.querySelector('#update-hwyear').selectedIndex].value);
    setCheckShowHide(changeQuid, '.ifHogwartsQuidditch-Change', document.querySelector('#newedit'));
    setCheckShowHide(changeLead, '.ifLeadership-Change', document.querySelector('#newedit'));
    
    if(!changeClasses) {
        document.querySelectorAll('.ifElec-Change').forEach(field => field.classList.add('hide'));
    }

    if(changeJobs) {
        setJobChange(document.querySelector('.form--jobschange-clip.form--update'));
    }

    if(removeJobs) {
        setJobRemove(document.querySelector('.form--jobsremove-clip.form--update'));
    }
}
function setJobChange(clip) {
    const url = `https://opensheet.elk.sh/146rEeh3eiyftnC-9NXF29rgSPRLAhuG2gss_nWp_xxw/NewClaims`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let idExists = data.filter(item => item.AccountID === document.querySelector('#update-id').value).length > 0;
            
            if(idExists) {
                let character = data.filter(item => item.AccountID === document.querySelector('#update-id').value)[0];
                if(character.Jobs !== '') {
                    let jobs = character.Jobs.split('+').map(job => JSON.parse(job));
                    return jobs;
                } else {
                    clip.innerHTML = `<p class="fullWidth">This character does not have any jobs to change.</p>`;
                }
            } else {
                clip.innerHTML = `<p class="fullWidth">This character does not exist on the sheet. Please double check the ID entered.</p>`;
            }
        }).then((jobs) => {
            let html = ``;
            jobs.forEach((job, i) => {
                html += `<u class="fullWidth editJobs">${job.section} — ${job.subsection}</u>
                <label class="form--job-line1">
                <strong>
                    Job Info - Line 1
                    <button onclick="openHelp(this)" type="button">
                        <i class="fa-solid fa-circle-question"></i>
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </strong>
                <i class="help">Unless one of the following applies, this line is reserved for the job title/position of your character. Exceptions are: for Ministry personnel, if they are part of a specific sub-division or team under the overall department (e.g., the Hitwizard Team within Magical Law Enforcement), this team label goes here; for Hogwarts teaching staff, place their speciality; for Quidditch players, please name their team; or, if they are self-employed and have a specific business name. In these instances, place the job title/position in <b>line 2</b>.</i>
                <input type="text" name="change-jobline1-${i}" id="change-jobline1-${i}" placeholder="Job Info - Line 1, see help for specifics">
            </label>
            <label class="form--job-line2">
                <strong>
                    Job Info - Line 2
                    <button onclick="openHelp(this)" type="button">
                        <i class="fa-solid fa-circle-question"></i>
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </strong>
                <i class="help">Not applicable for characters who are not one of the exception in Line 1 above or are house-specific Hogwarts Staff (e.g., a House Parent). For those exceptions: for Ministry personnel or self-employed individuals, place their job title/position; for Hogwarts teaching staff, place the years they teach (e.g, Years One to Three); for Quidditch, use their position on the team. Additionally, if your character is Hogwarts Staff and is house-specific, please place the house affiliation.</i>
                <input type="text" name="change-jobline2-${i}" id="change-jobline2-${i}" placeholder="Job Info - Line 2, see help for specifics">
            </label>`;
            });
            clip.innerHTML = html;
        });
}
function setJobRemove(clip) {
    const url = `https://opensheet.elk.sh/146rEeh3eiyftnC-9NXF29rgSPRLAhuG2gss_nWp_xxw/NewClaims`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let idExists = data.filter(item => item.AccountID === document.querySelector('#update-id').value).length > 0;
            
            if(idExists) {
                let character = data.filter(item => item.AccountID === document.querySelector('#update-id').value)[0];
                if(character.Jobs !== '') {
                    let jobs = character.Jobs.split('+').map(job => JSON.parse(job));
                    return jobs;
                } else {
                    clip.innerHTML = `<p class="fullWidth">This character does not have any jobs to remove.</p>`;
                }
            } else {
                clip.innerHTML = `<p class="fullWidth">This character does not exist on the sheet. Please double check the ID entered.</p>`;
            }
        }).then((jobs) => {
            let html = `<div class="form-flex fullWidth">`;
            jobs.forEach((job, i) => {
                html += `<label class="input-wrap">
                    <input type="checkbox" name="remove-jobs" id="remove-job-${i}" value="remove-job-${i}">
                    <div class="fancy-input"><i class="fa-light fa-check"></i></div>
                    <span class="editJobs">${job.section}, ${job.subsection}`;
                if(job.line1 !== '') {
                    html += `, ${job.line1}`;
                }
                if(job.line2 !== '') {
                    html += `, ${job.line2}`;
                }
                html += `</span>
                </label>`;
            });
            html += `</div>`;
            clip.innerHTML = html;
        });
}
function postToWIP() {
    let face = $("#wip-face").val().toLowerCase();
    let member = $("#wip-alias").val().toLowerCase();
    let message = `${capitalize(member)} has just claimed ${capitalize(face)} for a future character`;

    $.ajax({
        url: `https://script.google.com/macros/s/AKfycbwx2Xq5YNuWCR-Hb9IA0WoVWDS2IstKhS2AQUjLQUcwqtJs5NmV68hAhSDuYB1Dws7nzw/exec`,   
        data: {
          "Member": member,
          "Face": face,
        },
        method: 'POST',
        type: 'POST',
        dataType: "json", 
        success: function () {
            console.log('form submitted successfully');
            sendWipRequest(message);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error xhr: ' + jqXHR.status);
            console.log('error status: ' + textStatus);
            console.log('error text: ' + errorThrown);
            document.querySelector('#wip-warning').innerHTML = `Whoops! The sheet connection didn't quite work. Please refresh the page and try again! If this persists, please open the console (ctrl + shift + J) and let Lux know the error xhr, error status, and error text values.`;
        },
        complete: function () {
            formReset('#wipadd');
            $('button[type="submit"]').text('Submit');
            document.querySelector('#wip-warning').innerHTML = 'Success! Your face has been added to the sheet.';
        }
      });
}


function sendWipRequest(message) {
    const request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/983025351011745822/ZTAofp6ApdsjUN__K9IIFzkzeG1TVUBcZLR4jFSOR_v8vumgdbTkxlcvo3NTFM9-RRuV");

    request.setRequestHeader('Content-type', 'application/json');

    const params = {
        content: message
    }

    request.send(JSON.stringify(params));
}

function setAbilitiesSpecies(form) {
	let selected = Array.prototype.slice.call(document.querySelectorAll(`input[name="${form}-absp"]`))
					.filter(item => item.checked)
					.map(item => item.value);
	let animagusForm = document.querySelector(`#${form}-animagusform`).value.toLowerCase().trim(),
	percentField = document.querySelector(`#${form}-speciesamount`),
	percent = percentField.options[percentField.selectedIndex].value,
	wereType = document.querySelector(`#${form}-weretype`).value.toLowerCase().trim(),
	other = document.querySelector(`#${form}-otherabsp`).value.toLowerCase().trim();

	if(selected.includes('animagus')) {
		let index = selected.indexOf('animagus');
		selected[index] += ` (${animagusForm})`;
	}

	if(selected.includes('vamp')) {
		let index = selected.indexOf('vamp');
		selected[index] += ` (${percent})`;
	}

	if(selected.includes('veela')) {
		let index = selected.indexOf('veela');
		selected[index] += ` (${percent})`;
	}

	if(selected.includes('were')) {
		let index = selected.indexOf('were');
		selected[index] += ` (${percent})`;
	}

	if(selected.includes('other')) {
		selected = [...selected, other];
	}

	let string = selected.join(', ');

	return string;
}

function setNewJobs(formType) {
    let jobs = ``;
    let jobCount = parseInt(document.querySelector(`#${formType}-jobcount`).value);
    for(let i = 0; i < jobCount; i++) {
        let section = document.querySelector(`#${formType}-jobsection-${i}`).options[document.querySelector(`#${formType}-jobsection-${i}`).selectedIndex].innerText.toLowerCase();
        let subsection = document.querySelector(`#${formType}-jobsubsection-${i}`).value.toLowerCase().trim();
        let line1 = document.querySelector(`#${formType}-jobline1-${i}`).value.toLowerCase().trim();
        let line2 = document.querySelector(`#${formType}-jobline2-${i}`).value.toLowerCase().trim();
        if(i !== 0) {
            jobs += `+`
        }
        jobs += `{"section":"${section}","subsection":"${subsection}","line1":"${line1}","line2":"${line2}"}`;
    }
    return jobs;
}

function setHogwartsClasses(group, year, formType) {
    let hogwartsClasses = ``;
    let characterGroup = group.options[group.selectedIndex].value.trim();
    if(characterGroup === '7' || characterGroup === '9' || characterGroup === '14' || characterGroup === '16') {
        let characterYear = year.options[year.selectedIndex].innerText.toLowerCase();
        if(characterYear === 'first year' || characterYear === 'second year') {
            //only core and start classes
            let astronomy = document.querySelector(`#${formType}-astronomy`).options[document.querySelector(`#${formType}-astronomy`).selectedIndex].innerText.toLowerCase();
            let charms = document.querySelector(`#${formType}-charms`).options[document.querySelector(`#${formType}-charms`).selectedIndex].innerText.toLowerCase();
            let dada = document.querySelector(`#${formType}-dada`).options[document.querySelector(`#${formType}-dada`).selectedIndex].innerText.toLowerCase();
            let games = document.querySelector(`#${formType}-games`).options[document.querySelector(`#${formType}-games`).selectedIndex].innerText.toLowerCase();
            let herbology = document.querySelector(`#${formType}-herbology`).options[document.querySelector(`#${formType}-herbology`).selectedIndex].innerText.toLowerCase();
            let hom = document.querySelector(`#${formType}-historyofmagic`).options[document.querySelector(`#${formType}-historyofmagic`).selectedIndex].innerText.toLowerCase();
            let literacy = document.querySelector(`#${formType}-literacy`).options[document.querySelector(`#${formType}-literacy`).selectedIndex].innerText.toLowerCase();
            let theory = document.querySelector(`#${formType}-magicaltheory`).options[document.querySelector(`#${formType}-magicaltheory`).selectedIndex].innerText.toLowerCase();
            let maths = document.querySelector(`#${formType}-maths`).options[document.querySelector(`#${formType}-maths`).selectedIndex].innerText.toLowerCase();
            let potions = document.querySelector(`#${formType}-potions`).options[document.querySelector(`#${formType}-potions`).selectedIndex].innerText.toLowerCase();
            let transfig = document.querySelector(`#${formType}-transfiguration`).options[document.querySelector(`#${formType}-transfiguration`).selectedIndex].innerText.toLowerCase();
            let culture = document.querySelector(`#${formType}-culture`).options[document.querySelector(`#${formType}-culture`).selectedIndex].innerText.toLowerCase();
            let cultureGrade = document.querySelector(`#${formType}-culturegrade`).options[document.querySelector(`#${formType}-culturegrade`).selectedIndex].innerText.toLowerCase();

            hogwartsClasses += `{"class":"astronomy","grade":"${astronomy}"}`;
            hogwartsClasses += `+{"class":"charms","grade":"${charms}"}`;
            hogwartsClasses += `+{"class":"dada","grade":"${dada}"}`;
            hogwartsClasses += `+{"class":"games","grade":"${games}"}`;
            hogwartsClasses += `+{"class":"herbology","grade":"${herbology}"}`;
            hogwartsClasses += `+{"class":"historyOfMagic","grade":"${hom}"}`;
            hogwartsClasses += `+{"class":"literacy","grade":"${literacy}"}`;
            hogwartsClasses += `+{"class":"magicalTheory","grade":"${theory}"}`;
            hogwartsClasses += `+{"class":"maths","grade":"${maths}"}`;
            hogwartsClasses += `+{"class":"potions","grade":"${potions}"}`;
            hogwartsClasses += `+{"class":"transfiguration","grade":"${transfig}"}`;
            hogwartsClasses += `+{"class":"${culture}","grade":"${cultureGrade}"}`;
        } else if(characterYear === 'third year' || characterYear === 'fourth year' || characterYear === 'fifth year') {
            //core and elective fields
            let astronomy = document.querySelector(`#${formType}-astronomy`).options[document.querySelector(`#${formType}-astronomy`).selectedIndex].innerText.toLowerCase();
            let charms = document.querySelector(`#${formType}-charms`).options[document.querySelector(`#${formType}-charms`).selectedIndex].innerText.toLowerCase();
            let dada = document.querySelector(`#${formType}-dada`).options[document.querySelector(`#${formType}-dada`).selectedIndex].innerText.toLowerCase();
            let games = document.querySelector(`#${formType}-games`).options[document.querySelector(`#${formType}-games`).selectedIndex].innerText.toLowerCase();
            let herbology = document.querySelector(`#${formType}-herbology`).options[document.querySelector(`#${formType}-herbology`).selectedIndex].innerText.toLowerCase();
            let hom = document.querySelector(`#${formType}-historyofmagic`).options[document.querySelector(`#${formType}-historyofmagic`).selectedIndex].innerText.toLowerCase();
            let potions = document.querySelector(`#${formType}-potions`).options[document.querySelector(`#${formType}-potions`).selectedIndex].innerText.toLowerCase();
            let transfig = document.querySelector(`#${formType}-transfiguration`).options[document.querySelector(`#${formType}-transfiguration`).selectedIndex].innerText.toLowerCase();

            hogwartsClasses += `{"class":"astronomy","grade":"${astronomy}"}`;
            hogwartsClasses += `+{"class":"charms","grade":"${charms}"}`;
            hogwartsClasses += `+{"class":"dada","grade":"${dada}"}`;
            hogwartsClasses += `+{"class":"games","grade":"${games}"}`;
            hogwartsClasses += `+{"class":"herbology","grade":"${herbology}"}`;
            hogwartsClasses += `+{"class":"historyOfMagic","grade":"${hom}"}`;
            hogwartsClasses += `+{"class":"potions","grade":"${potions}"}`;
            hogwartsClasses += `+{"class":"transfiguration","grade":"${transfig}"}`;

            for(let i = 0; i < 4; i++) {
                if(document.querySelector(`#${formType}-elec${i}`) && document.querySelector(`#${formType}-elec${i}`).options[document.querySelector(`#${formType}-elec${i}`).selectedIndex].value.toLowerCase() !== ``) {
                    let elec = document.querySelector(`#${formType}-elec${i}`).options[document.querySelector(`#${formType}-elec${i}`).selectedIndex].innerText.toLowerCase();
                    let grade = document.querySelector(`#${formType}-elec${i}grade`).options[document.querySelector(`#${formType}-elec${i}grade`).selectedIndex].innerText.toLowerCase();
                    hogwartsClasses += `+{"class":"${elec}","grade":"${grade}"}`;
                }
            }
        } else {
            for(let i = 0; i < 8; i++) {
                if(document.querySelector(`#${formType}-elec${i}`) && document.querySelector(`#${formType}-elec${i}`).options[document.querySelector(`#${formType}-elec${i}`).selectedIndex].value.toLowerCase() !== ``) {
                    if(i !== 0) {
                        hogwartsClasses += `+`;
                    }
                    let elec = document.querySelector(`#${formType}-elec${i}`).options[document.querySelector(`#${formType}-elec${i}`).selectedIndex].innerText.toLowerCase();
                    let grade = document.querySelector(`#${formType}-elec${i}grade`).options[document.querySelector(`#${formType}-elec${i}grade`).selectedIndex].innerText.toLowerCase();
                    hogwartsClasses += `{"class":"${elec}","grade":"${grade}"}`;
                }
            }
        }
    }
    return hogwartsClasses;
}

function sendDiscordMessage(webhook, message, embedTitle, notification = null, color = null) {
    const request = new XMLHttpRequest();
    request.open("POST", webhook);

    request.setRequestHeader('Content-type', 'application/json');

    const params = {
  	"content": notification,
	  "embeds": [
	    {
	      "title": embedTitle,
	      "description": message,
	      "color": color
	    }
	  ],
	  "attachments": []
	};

    request.send(JSON.stringify(params));
}
function discordSortMessage(character) {
    let message = `**View Profile: <https://totl.jcink.net/?showuser=${character.AccountID}>**
    **Sort Into:** ${capitalize(character.GroupName, [`'`, '-'])}`;
    if(character.PreferredDorm !== ``) {
        message += `
        **Preferred Dorm:** ${character.PreferredDorm}`;
    }
    if(character.CanonRelation !== ``) {
        let canonCode = ``;
        let firstName = character.Character.split(' ')[0];
        let lastName = character.Character.split(' ').filter((item, i) => i !== 0).join(' ');
        let formattedName = `${lastName.toUpperCase()}, ${firstName.toLowerCase()}`;
        let primaryJob = `unemployed`;
        if(character.Jobs && character.Jobs !== ``) {
            let job = character.Jobs.split('+').map(job => JSON.parse(job))[0];
            if(job.line2 && job.line2 !== ``) {
                primaryJob = job.line2;
            } else {
                primaryJob = job.line1;
            }
        }
        if(character.GroupID === '17') {
            canonCode = `<a href="?showuser=${character.AccountID}" class="g-${character.GroupID}"><b>${formattedName}.</b></a> ${primaryJob}. b. ${character.BirthYear}. d. ${character.DeathYear}. r. ${character.ReturnYear}. ${character.Member}.<br>`;
        } else {
            canonCode = `<a href="?showuser=${character.AccountID}" class="g-${character.GroupID}"><b>${formattedName}.</b></a> ${primaryJob}. b. ${character.BirthYear}. ${character.Member}.<br>`;
        }
        message += `
        **Relation to Canon:**
        `;
        message += '```' + character.CanonRelation + '```';
        message += `
        **Canon Code:**
        `;
        message += '```' + canonCode + '```';
    }
    return message;
}

function discordEmbedColor (groupID) {
    switch(groupID) {
        case `6`: //adults
            groupColor = `11749717`;
            break;
        case `7`: //gryffindor
            groupColor = `9644591`;
            break;
        case `8`: //hogwarts
            groupColor = `6379161`;
            break;
        case `9`: //hufflepuff
            groupColor = `12031093`;
            break;
        case `11`: //press
            groupColor = `11568724`;
            break;
        case `12`: //ministry
            groupColor = `5146238`;
            break;
        case `13`: //quidditch
            groupColor = `9601693`;
            break;
        case `14`: //ravenclaw
            groupColor = `4283278`;
            break;
        case `15`: //healers
            groupColor = `5798739`;
            break;
        case `16`: //slytherin
            groupColor = `2972477`;
            break;
        case `17`: //returners
            groupColor = `5933463`;
            break;
        case `18`: //entertainment
            groupColor = `5413538`;
            break;
        default:
            groupColor = null;
            break;
    }
}

function formReset(form) {
    $(form).trigger('reset');
    let formObj = document.querySelector(form);
    formObj.querySelectorAll('.ifStudent, .ifCore, .ifStart, .ifElec, .ifUpper, .ifLeadershipPossible, .ifHogwartsQuidditch, .ifLeadership, .ifAdult, .ifJob, .ifUni, .ifCanon, .ifReturn').forEach(field => field.classList.add('hide'));
    formObj.querySelectorAll('input[name="sort-absp"]').forEach(box => box.checked = false);
}
function postClaims(char) {
    $.ajax({
        url: `https://script.google.com/macros/s/AKfycbyazB9ExMJDak85zdm4Nz0_eGSOQfJnKSTBtCj_ejva-3KBJxUIgFCWHwp8zM2ivjKP/exec`,   
        data: char,
        method: 'POST',
        type: 'POST',
        dataType: "json", 
        async: false,
        success: function () {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
        },
        complete: function () {
            console.log('request complete');
        }
    });
}