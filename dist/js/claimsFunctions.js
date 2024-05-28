/****** Initialization *******/
function initReserves(data) {
    data.sort((a, b) => {
        if(a.Face.toLowerCase().trim() < b.Face.toLowerCase().trim()) {
            return -1;
        } else if(a.Face.toLowerCase().trim() > b.Face.toLowerCase().trim()) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = ``;

    data.forEach((item, i) => {
        if(i === 0) {
            html += claimHeader(item.Face[0]);
            html += claimBox(item.Face, [`Reserved by ${item.Member}`]);
        } else if (data[i - 1].Face[0].toLowerCase() !== item.Face[0].toLowerCase()) {
            html += claimHeader(item.Face[0]);
            html += claimBox(item.Face, [`Reserved by ${item.Member}`]);
        } else {
            html += claimBox(item.Face, [`Reserved by ${item.Member}`]);
        }
    });

    document.querySelector('#clip-reserves').innerHTML = html;
}
function initFaces(data) {
    data.sort((a, b) => {
        if(a.Face.toLowerCase().trim() < b.Face.toLowerCase().trim()) {
            return -1;
        } else if(a.Face.toLowerCase().trim() > b.Face.toLowerCase().trim()) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = ``;

    data.forEach((item, i) => {
        if(i === 0) {
            html += claimHeader(item.Face[0]);
            html += claimBox(item.Face, [`Representing ${item.Character}`, `Played by ${item.Member}`], item.GroupID, `?showuser=${item.AccountID}`);
        } else if (data[i - 1].Face[0].toLowerCase() !== item.Face[0].toLowerCase()) {
            html += claimHeader(item.Face[0]);
            html += claimBox(item.Face, [`Representing ${item.Character}`, `Played by ${item.Member}`], item.GroupID, `?showuser=${item.AccountID}`);
        } else {
            html += claimBox(item.Face, [`Representing ${item.Character}`, `Played by ${item.Member}`], item.GroupID, `?showuser=${item.AccountID}`);
        }
    });

    document.querySelector('#clip-faces').innerHTML = html;
}
function initAbilities(data) {
    data = data.filter(item => item.AbilitiesSpecies && item.AbilitiesSpecies !== '');
    console.log(data);
    let abilities = [];

    data.forEach(item => {
        let abilitiesArray = item.AbilitiesSpecies.split(', ');
        abilitiesArray.forEach(ability => {
            abilities.push({
                trait: ability.split(' (')[0],
                subtrait: ability.split(' (').length > 1 ? ability.split(' (')[1].split(')')[0] : '',
                id: item.AccountID,
                character: item.Character,
                group: item.GroupID,
            });
        });
    });

    abilities.sort((a, b) => {
        if(a.trait.toLowerCase().trim() < b.trait.toLowerCase().trim()) {
            return -1;
        } else if(a.trait.toLowerCase().trim() > b.trait.toLowerCase().trim()) {
            return 1;
        } else if(a.character.toLowerCase().trim() < b.character.toLowerCase().trim()) {
            return -1;
        } else if(a.character.toLowerCase().trim() > b.character.toLowerCase().trim()) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = ``;

    abilities.forEach((item, i) => {
        if (i === 0) {
            let lines = [];
            if(item.subtrait && item.subtrait !== '') {
                lines.push(item.subtrait);
            }
            html += claimHeader(item.trait, 3, 'left', 'accordion--trigger');
            html += openAccordion();
            html += openGrid();
            html += claimBox(item.character, lines, item.group, `?showuser=${item.id}`);
        } else if (abilities[i - 1].trait.toLowerCase().trim() !== item.trait.toLowerCase().trim()) {
            let lines = [];
            if(item.subtrait && item.subtrait !== '') {
                lines.push(item.subtrait);
            }
            html += closeDiv();
            html += closeDiv();
            html += claimHeader(item.trait, 3, 'left', 'accordion--trigger');
            html += openAccordion();
            html += openGrid();
            html += claimBox(item.character, lines, item.group, `?showuser=${item.id}`);
        } else {
            let lines = [];
            if(item.subtrait && item.subtrait !== '') {
                lines.push(item.subtrait);
            }
            html += claimBox(item.character, lines, item.group, `?showuser=${item.id}`);
        }

        if(abilities.length - 1 === i) {
            html += closeDiv();
            html += closeDiv();
        }
    });

    document.querySelector('#clip-abilities').innerHTML = html;
}
function initJobs(data) {
    let entries = [];
    data = data.filter(item => item.Jobs && item.Jobs !== '');
    
    data.forEach(character => {
        let jobs = character.Jobs.split(`+`).map(job => JSON.parse(job));
        jobs.forEach(job => {
            let locationID = 0;
            if (job.section === 'ministry of magic') {
                locationID = 1;
            } else if (job.section === `st. mungo's`) {
                locationID = 2;
            } else if (job.section === `the daily prophet`) {
                locationID = 3;
            } else if (job.section === `diagon alley`) {
                locationID = 4;
            } else if (job.section === `horizon alley`) {
                locationID = 5;
            } else if (job.section === `knockturn alley`) {
                locationID = 6;
            } else if (job.section === `mythic alley`) {
                locationID = 7;
            } else if (job.section === `wizarding london (other)`) {
                locationID = 8;
            } else if (job.section === `muggle london (other)`) {
                locationID = 9;
            } else if (job.section === `hogwarts castle`) {
                locationID = 10;
            } else if (job.section === `hogsmeade`) {
                locationID = 11;
            } else if (job.section === `ilkley`) {
                locationID = 12;
            } else if (job.section === `elsewhere`) {
                locationID = 13;
            } else if (job.section === `professional sports`) {
                locationID = 14;
            } else if (job.section === `self-employed`) {
                locationID = 15;
            }
            entries.push({
                Character: character.Character,
                AccountID: character.AccountID,
                GroupID: character.GroupID,
                Location: job.section,
                LocationID: locationID,
                Employer: job.subsection !== '' ? job.subsection : 'self-employed',
                Line1: job.line1 !== '' ? job.line1 : null,
                Line2: job.line2 !== '' ? job.line2 : null
            });
        });
    });

    entries.sort((a, b) => {
        if (a.LocationID < b.LocationID) {
            return -1;
        } else if (b.LocationID < a.LocationID) {
            return 1;
        } else if (a.Employer.toLowerCase().trim().replace('the ', '') < b.Employer.toLowerCase().trim().replace('the ', '')) {
            return -1;
        } else if (b.Employer.toLowerCase().trim().replace('the ', '') < a.Employer.toLowerCase().trim().replace('the ', '')) {
            return 1;
        } else if (a.Line1 < b.Line1) {
            return -1;
        } else if (b.Line1 < a.Line1) {
            return 1;
        } else if (a.Line2 < b.Line2) {
            return -1;
        } else if (b.Line2 < a.Line2) {
            return 1;
        } else if (a.Character < b.Character) {
            return -1;
        } else if (b.Character < a.Character) {
            return 1;
        } else {
            return 0;
        }
    });

    let labels = ``;
    let tabs = ``;

    entries.forEach((item, i) => {
        let lines = [];

        if(item.Line1 && item.Line2) {
            lines = [item.Line1, item.Line2];
        } else if (item.Line1) {
            lines = [item.Line1];
        } else if (item.Line2) {
            lines = [item.Line2];
        }

        if(i === 0) {
            labels += menuLink(item.Location);
            tabs += openTab(cleanText(item.Location), 'accordion');
            tabs += claimHeader(item.Employer, 3, 'left', 'accordion--trigger');
            tabs += openAccordion();
            tabs += openGrid();
            tabs += claimBox(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        } else if(entries[i - 1].LocationID !== item.LocationID) {
            labels += `<a href="#${cleanText(item.Location)}">${item.Location}</a>`;
            tabs += closeDiv();
            tabs += closeDiv();
            tabs += closeTab();
            tabs += openTab(cleanText(item.Location), 'accordion');
            tabs += claimHeader(item.Employer, 3, 'left', 'accordion--trigger');
            tabs += openAccordion();
            tabs += openGrid();
            tabs += claimBox(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        } else if(entries[i - 1].Employer !== item.Employer) {
            tabs += closeDiv();
            tabs += closeDiv();
            tabs += claimHeader(item.Employer, 3, 'left', 'accordion--trigger');
            tabs += openAccordion();
            tabs += openGrid();
            tabs += claimBox(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        } else {
            tabs += claimBox(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        if(entries.length - 1 === i) {
            tabs += closeDiv();
            tabs += closeDiv();
            tabs += closeTab();
        }

    });
    
    document.querySelector('#clip-job-locations').innerHTML = labels;
    document.querySelector('#clip-job-tabs').innerHTML = tabs;
}
function initStudents(data) {
    data = data.filter(item => item.HogwartsYear && item.HogwartsYear !== '');
    let hogwartsOriginal = data.filter(item => item.GroupName !== 'miscellaneous students' && item.HogwartsClasses && item.HogwartsClasses !== '');
    let externalOriginal = data.filter(item => item.GroupName === 'miscellaneous students');
    let hogwarts = [], external = [], hogwartsFormatted = [];

    //add year num to hogwarts
    hogwartsOriginal.forEach(character => {
        if (character.HogwartsYear === 'first year') {
            yearNum = 1;
        } else if (character.HogwartsYear === `second year`) {
            yearNum = 2;
        } else if (character.HogwartsYear === `third year`) {
            yearNum = 3;
        } else if (character.HogwartsYear === `fourth year`) {
            yearNum = 4;
        } else if (character.HogwartsYear === `fifth year`) {
            yearNum = 5;
        } else if (character.HogwartsYear === `sixth year`) {
            yearNum = 6;
        } else if (character.HogwartsYear === `seventh year`) {
            yearNum = 7;
        }
        hogwartsFormatted.push({
            ...character,
            YearNum: yearNum,
        });
    });

    //add year num to external
    externalOriginal.forEach(character => {
        if (character.HogwartsYear === 'first year') {
            yearNum = 1;
        } else if (character.HogwartsYear === `second year`) {
            yearNum = 2;
        } else if (character.HogwartsYear === `third year`) {
            yearNum = 3;
        } else if (character.HogwartsYear === `fourth year`) {
            yearNum = 4;
        } else if (character.HogwartsYear === `fifth year`) {
            yearNum = 5;
        } else if (character.HogwartsYear === `sixth year`) {
            yearNum = 6;
        } else if (character.HogwartsYear === `seventh year`) {
            yearNum = 7;
        }
        external.push({
            ...character,
            YearNum: yearNum,
        });
    });
    
    //class list formatted
    hogwartsFormatted.forEach(character => {
        let classes = character.HogwartsClasses.split(`+`).map(obj => JSON.parse(obj));
        classes.forEach(obj => {
            hogwarts.push({
                Character: character.Character,
                AccountID: character.AccountID,
                GroupID: character.GroupID,
                Year: character.HogwartsYear,
                YearNum: character.YearNum,
                Class: obj.class,
                Grade: obj.grade
            });
        });
    });

    let hogwartsDorms = [...hogwartsFormatted].filter(item => item.Dorm && item.Dorm !== ''), hogwartsQuidditch = [...hogwartsFormatted].filter(item => item.QuidditchPosition && item.QuidditchPosition !== ''), hogwartsLeadership = [...hogwartsFormatted].filter(item => item.LeadershipPosition && item.LeadershipPosition !== '');

    hogwarts.sort((a, b) => {
        if (parseInt(a.YearNum) < parseInt(b.YearNum)) {
            return -1;
        } else if (parseInt(b.YearNum) < parseInt(a.YearNum)) {
            return 1;
        } else if (a.Class < b.Class) {
            return -1;
        } else if (b.Class < a.Class) {
            return 1;
        } else if (a.Character < b.Character) {
            return -1;
        } else if (b.Character < a.Character) {
            return 1;
        } else {
            return 0;
        }
    });

    hogwartsDorms.sort((a, b) => {
        if (a.GroupName < b.GroupName) {
            return -1;
        } else if (b.GroupName < a.GroupName) {
            return 1;
        } else if (parseInt(a.YearNum) < parseInt(b.YearNum)) {
            return -1;
        } else if (parseInt(b.YearNum) < parseInt(a.YearNum)) {
            return 1;
        } else if (a.Dorm < b.Dorm) {
            return -1;
        } else if (b.Dorm < a.Dorm) {
            return 1;
        } else if (a.Character < b.Character) {
            return -1;
        } else if (b.Character < a.Character) {
            return 1;
        } else {
            return 0;
        }
    });

    hogwartsQuidditch.sort((a, b) => {
        if (a.GroupName < b.GroupName) {
            return -1;
        } else if (b.GroupName < a.GroupName) {
            return 1;
        } else if (a.Character < b.Character) {
            return -1;
        } else if (b.Character < a.Character) {
            return 1;
        } else {
            return 0;
        }
    });

    hogwartsLeadership.sort((a, b) => {
        if (a.LeadershipPosition === 'head boy/girl' && a.LeadershipPosition !== b.LeadershipPosition) {
            return -1;
        } else if (b.LeadershipPosition === 'head boy/girl' && a.LeadershipPosition !== b.LeadershipPosition) {
            return 1;
        } else if (a.HogwartsYear === 'seventh year' && a.HogwartsYear !== b.HogwartsYear) {
            return -1;
        } else if (b.HogwartsYear === 'seventh year' && a.HogwartsYear !== b.HogwartsYear) {
            return 1;
        } else if (a.HogwartsYear === 'sixth year' && a.HogwartsYear !== b.HogwartsYear) {
            return -1;
        } else if (b.HogwartsYear === 'sixth year' && a.HogwartsYear !== b.HogwartsYear) {
            return 1;
        } else if (a.HogwartsYear === 'fifth year' && a.HogwartsYear !== b.HogwartsYear) {
            return -1;
        } else if (b.HogwartsYear === 'fitfh year' && a.HogwartsYear !== b.HogwartsYear) {
            return 1;
        } else if (a.Character < b.Character) {
            return -1;
        } else if (b.Character < a.Character) {
            return 1;
        } else {
            return 0;
        }
    });

    external.sort((a, b) => {
        if (a.BasicSchool < b.BasicSchool) {
            return -1;
        } else if (b.BasicSchool < a.BasicSchool) {
            return 1;
        } else if (parseInt(a.YearNum) < parseInt(b.YearNum)) {
            return -1;
        } else if (parseInt(b.YearNum) < parseInt(a.YearNum)) {
            return 1;
        } else if (a.Character < b.Character) {
            return -1;
        } else if (b.Character < a.Character) {
            return 1;
        } else {
            return 0;
        }
    });

    let classLabels = ``, classTabs = ``, dormLabels = ``, dormTabs = ``, quidLabels = ``, quidTabs = ``, leadLabels = ``, leadTabs = ``, extLabels = ``, extTabs = ``;

    //class lists
    hogwarts.forEach((student, i) => {
        if(i === 0) {
            classLabels += menuLink(student.Year);
            classTabs += openTab(cleanText(student.Year), 'accordion');
            classTabs += claimHeader(student.Class, 3, 'left', 'accordion--trigger');
            classTabs += openAccordion();
            classTabs += openGrid();
            classTabs += claimBox(student.Character, [student.Grade], student.GroupID, `?showuser=${student.AccountID}`);
        } else if(hogwarts[i - 1].YearNum !== student.YearNum) {
            classLabels += menuLink(student.Year);
            classTabs += closeDiv();
            classTabs += closeDiv();
            classTabs += closeTab();
            classTabs += openTab(cleanText(student.Year), 'accordion');
            classTabs += claimHeader(student.Class, 3, 'left', 'accordion--trigger');
            classTabs += openAccordion();
            classTabs += openGrid();
            classTabs += claimBox(student.Character, [student.Grade], student.GroupID, `?showuser=${student.AccountID}`);
        } else if(hogwarts[i - 1].Class !== student.Class) {
            classTabs += closeDiv();
            classTabs += closeDiv();
            classTabs += claimHeader(student.Class, 3, 'left', 'accordion--trigger');
            classTabs += openAccordion();
            classTabs += openGrid();
            classTabs += claimBox(student.Character, [student.Grade], student.GroupID, `?showuser=${student.AccountID}`);
        } else {
            classTabs += claimBox(student.Character, [student.Grade], student.GroupID, `?showuser=${student.AccountID}`);
        }

        if(hogwarts.length - 1 === i) {
            classTabs += closeDiv();
            classTabs += closeDiv();
            classTabs += closeTab();
        }
    });

    //dorms
    hogwartsDorms.forEach((student, i) => {
        if(i === 0) {
            dormLabels += menuLink(student.GroupName, `#dorms-${cleanText(student.GroupName)}`);
            dormTabs += openTab(cleanText(student.GroupName), ``, `#dorms-${cleanText(student.GroupName)}`);
            dormTabs += claimHeader(student.HogwartsYear, 3, 'left');
            dormTabs += claimHeader(student.Dorm, 4, 'left');
            dormTabs += openGrid();
            dormTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        } else if(hogwartsDorms[i - 1].GroupName !== student.GroupName) {
            dormLabels += menuLink(student.GroupName, `#dorms-${cleanText(student.GroupName)}`);
            dormTabs += closeDiv();
            dormTabs += closeTab();
            dormTabs += openTab(cleanText(student.GroupName), ``, `#dorms-${cleanText(student.GroupName)}`);
            dormTabs += claimHeader(student.HogwartsYear, 3, 'left');
            dormTabs += claimHeader(student.Dorm, 4, 'left');
            dormTabs += openGrid();
            dormTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        } else if(hogwartsDorms[i - 1].YearNum !== student.YearNum) {
            dormTabs += closeDiv();
            dormTabs += claimHeader(student.HogwartsYear, 3, 'left');
            dormTabs += claimHeader(student.Dorm, 4, 'left');
            dormTabs += openGrid();
            dormTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        } else if(hogwartsDorms[i - 1].Dorm !== student.Dorm) {
            dormTabs += closeDiv();
            dormTabs += claimHeader(student.Dorm, 4, 'left');
            dormTabs += openGrid();
            dormTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        } else {
            dormTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        }

        if(hogwartsDorms.length - 1 === i) {
            dormTabs += closeDiv();
            dormTabs += closeTab();
        }
    });

    //quidditch
    hogwartsQuidditch.forEach((student, i) => {
        if(i === 0) {
            quidLabels += menuLink(student.GroupName, `#quidditch-${cleanText(student.GroupName)}`);
            quidTabs += openTab(cleanText(student.GroupName), ``, `#quidditch-${cleanText(student.GroupName)}`);
            quidTabs += openGrid();
            quidTabs += claimBox(student.Character, [student.QuidditchPosition], student.GroupID, `?showuser=${student.AccountID}`);
        } else if(hogwartsQuidditch[i - 1].GroupName !== student.GroupName) {
            quidLabels += menuLink(student.GroupName, `#quidditch-${cleanText(student.GroupName)}`);
            quidTabs += closeDiv();
            quidTabs += closeTab();
            quidTabs += openTab(cleanText(student.GroupName), ``, `#quidditch-${cleanText(student.GroupName)}`);
            quidTabs += openGrid();
            quidTabs += claimBox(student.Character, [student.QuidditchPosition], student.GroupID, `?showuser=${student.AccountID}`);
        } else {
            quidTabs += claimBox(student.Character, [student.QuidditchPosition], student.GroupID, `?showuser=${student.AccountID}`);
        }

        if(hogwartsQuidditch.length - 1 === i) {
            quidTabs += closeDiv();
            quidTabs += closeTab();
        }
    });

    //leadership
    console.log(hogwartsLeadership);
    hogwartsLeadership.forEach((student, i) => {
        if(i === 0) {
            if(student.LeadershipPosition === 'head boy/girl') {
                leadLabels += menuLink(`Student Heads`, `#lead-heads`);
                leadTabs += openTab(`Student Heads`, ``, `#lead-heads`);
                leadTabs += openGrid();
                leadTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
            } else {
                leadLabels += menuLink(`Prefects`, `#lead-prefects`);
                leadTabs += openTab(`Prefects`, ``, `#lead-prefects`);
                leadTabs += claimHeader(student.HogwartsYear, 3, 'left');
                leadTabs += openGrid();
                leadTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
            }
        } else if(hogwartsLeadership[i - 1].LeadershipPosition !== student.LeadershipPosition) {
            if(student.LeadershipPosition === 'head boy/girl') {
                leadLabels += menuLink(`Student Heads`, `#lead-heads`);
                leadTabs += closeDiv();
                leadTabs += closeTab();
                leadTabs += openTab(`Student Heads`, ``, `#lead-heads`);
                leadTabs += openGrid();
                leadTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
            } else {
                leadLabels += menuLink(`Prefects`, `#lead-prefects`);
                leadTabs += closeDiv();
                leadTabs += closeTab();
                leadTabs += openTab(`Prefects`, ``, `#lead-prefects`);
                leadTabs += claimHeader(student.HogwartsYear, 3, 'left');
                leadTabs += openGrid();
                leadTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
            }
        } else if(hogwartsLeadership[i - 1].YearNum !== student.YearNum) {
            leadTabs += closeDiv();
            leadTabs += claimHeader(student.HogwartsYear, 3, 'left');
            leadTabs += openGrid();
            leadTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        } else {
            leadTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        }

        if(hogwartsLeadership.length - 1 === i) {
            leadTabs += closeDiv();
            leadTabs += closeTab();
        }
    });

    //external
    external.forEach((student, i) => {
        if(i === 0) {
            extLabels += menuLink(student.BasicSchool);
            extTabs += openTab(cleanText(student.BasicSchool), 'accordion');
            extTabs += claimHeader(student.HogwartsYear, 3, 'left', 'accordion--trigger');
            extTabs += openAccordion();
            extTabs += openGrid();
            extTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        } else if(external[i - 1].BasicSchool !== student.BasicSchool) {
            extLabels += menuLink(student.BasicSchool);
            extTabs += closeDiv();
            extTabs += closeDiv();
            extTabs += closeTab();
            extTabs += openTab(cleanText(student.BasicSchool), 'accordion');
            extTabs += claimHeader(student.HogwartsYear, 3, 'left', 'accordion--trigger');
            extTabs += openAccordion();
            extTabs += openGrid();
            extTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        } else if(external[i - 1].YearNum !== student.YearNum) {
            extTabs += closeDiv();
            extTabs += closeDiv();
            extTabs += claimHeader(student.HogwartsYear, 3, 'left', 'accordion--trigger');
            extTabs += openAccordion();
            extTabs += openGrid();
            extTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        } else {
            extTabs += claimBox(student.Character, [], student.GroupID, `?showuser=${student.AccountID}`);
        }

        if(external.length - 1 === i) {
            extTabs += closeDiv();
            extTabs += closeDiv();
            extTabs += closeTab();
        }
    });

    document.querySelector('.accordion--content[data-category="classes"]').innerHTML = classLabels;
    document.querySelector('tag-tab[data-category="classes"] tag-tabset').innerHTML = classTabs;
    document.querySelector('.accordion--content[data-category="dorms"]').innerHTML = dormLabels;
    document.querySelector('tag-tab[data-category="dorms"] tag-tabset').innerHTML = dormTabs;
    document.querySelector('.accordion--content[data-category="quidditch"]').innerHTML = quidLabels;
    document.querySelector('tag-tab[data-category="quidditch"] tag-tabset').innerHTML = quidTabs;
    document.querySelector('.accordion--content[data-category="leadership"]').innerHTML = leadLabels;
    document.querySelector('tag-tab[data-category="leadership"] tag-tabset').innerHTML = leadTabs;
    document.querySelector('.accordion--content[data-category="external"]').innerHTML = extLabels;
    document.querySelector('tag-tab[data-category="external"] tag-tabset').innerHTML = extTabs;
}

/****** Formatting *******/
function claimHeader(title, level = 3, alignment = 'center', classes = '') {
    return `<h${level} data-box-align="${alignment}" class="fullWidth claims-header ${classes}">${title}</h${level}>`;
}
function claimBox(title, lines, group = '', link = null) {
    let header = `<strong>${title}</strong>`;
    if(link) {
        header = `<a href="${link}"><span>${title}</span></a>`;
    }
    lines = lines.map(item => `<span>${item}</span>`).join('');
    return `<div class="claim g-${group}">
        ${header}
        ${lines}
    </div>`;
}
function openAccordion() {
    return `<div class="accordion--content">`;
}
function openGrid() {
    return `<div class="claim-grid" data-type="grid" data-columns="3" data-gap="smsquare">`;
}
function closeDiv() {
    return `</div>`;
}
function openTab(title, classes = '', altID = null) {
    if(altID) {
        return `<tag-tab data-key="${altID}" class="${classes}">`;
    }
    return `<tag-tab data-key="#${title}" class="${classes}">`;
}
function closeTab() {
    return `</tag-tab>`;
}
function menuLink(title, altID = null) {
    if(altID) {
        return `<a href="${altID}">${title}</a>`;
    }
    return `<a href="#${cleanText(title)}">${title}</a>`;
}