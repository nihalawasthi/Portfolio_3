const terminal = document.getElementById('terminal');
        let commandHistory = [];
        let historyIndex = -1;

        terminal.addEventListener('keydown', function (event) {
            const input = document.querySelector('.input');

            if (event.key === 'Enter') {
                event.preventDefault();

                const command = input.innerText.trim();
                let output = '';

                if (command !== '') {
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;
                }

                switch (command.toLowerCase()) {
                    case 'cd ..':
                        output = '$ <span><a href="../">home</a></span>';
                        break;
                    case 'cd Projects':
                        output = '$ <span><a href="../project">Projects</a></span>';
                        break;
                    case 'experience':
                        output = '$ <span><a href="https://www.linkedin.com/in/nihal-awasthi-16a644251">Experience</a></span>';
                        break;
                    case 'experience':
                        output = '$ <span><a href="https://www.linkedin.com/in/nihal-awasthi-16a644251">Experience</a></span>';
                        break;
                    case 'contact':
                        output = '$ <span>Reach me at: nihalawasthi498@gmail.com or visit my <a href="https://www.linkedin.com/in/nihal-awasthi-16a644251">LinkedIn profile.</a></span>';
                        break;
                    case 'pwd':
                        output = '$ <span>about</span>';
                        break;
                    case 'ls':
                        output = '$ <span>. .. bio.txt Projects</span>';
                        break;
                    case 'help':
                        output = '$ <span>pwd, ls, whoami, clear, cat, cd, contact, exit, experience</span>';
                        break;
                    case 'cat bio.txt':
                        output = "$ <span>I'm Nihal Awasthi, a DevSecOps specializing in blockchain analysis, system administration, and reverse engineering.</span>";
                        break;
                    case 'whoami':
                        output = '$ <span>Nihal Awasthi</span>';
                        break;
                    case 'clear':
                        terminal.innerHTML = '<p>(userNyx)-[~] $ <span class="input" contenteditable="true"></span></p>';
                        terminal.querySelector('.input').focus();
                        return;
                    case 'exit':
                        terminal.innerHTML = '<p>(userNyx)-[~] $ <span class="input" contenteditable="true"></span></p>';
                        terminal.querySelector('.input').focus();
                        return;
                    default:
                        output = `$ <span>Command not recognized: ${command}</span>`;
                }

                const commandLine = document.createElement('p');
                commandLine.innerHTML = `(userNyx)-[~] $ <span>${command}</span>`;
                terminal.insertBefore(commandLine, input.parentElement);

                if (output) {
                    const outputLine = document.createElement('p');
                    outputLine.innerHTML = output;
                    terminal.insertBefore(outputLine, input.parentElement);
                }

                input.innerText = '';

                terminal.appendChild(input.parentElement);

                input.focus();

                terminal.scrollTop = terminal.scrollHeight;
            }

            if (event.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    input.innerText = commandHistory[historyIndex];
                    placeCaretAtEnd(input);
                }
            }

            if (event.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.innerText = commandHistory[historyIndex];
                    placeCaretAtEnd(input);
                } else {
                    historyIndex = commandHistory.length;
                    input.innerText = '';
                }
            }
        });

        terminal.addEventListener('click', function () {
            const input = document.querySelector('.input');
            input.focus();
        });

        function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }