const Engineer = require('../lib/Engineer');

test('create engineer object', () => {
    const engineer = new Engineer('Paul', 5309, 'paul@theseusgrp.com', 'PaulThomasWI');
    
    expect(engineer.github) .toEqual(expect.any(String));
});

test('get github', () => {
    const engineer = new Engineer('Paul', 5309, 'paul@theseusgrp.com', 'PaulThomasWI');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

test('get role', () => {
    const engineer = new Engineer('Paul', 5309, 'paul@theseusgrp.com', 'PaulThomasWI');

    expect(engineer.getRole()).toEqual("Engineer");
});