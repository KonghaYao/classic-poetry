// deno 自动注册 meilisearch
const createMachine = (token, team_id) => {
    return fetch("https://api.meilisearch.com/api/v1/projects", {
        headers: {
            accept: "application/json, text/plain, */*",
            "accept-language":
                "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            authorization: "Bearer " + token,
            "content-type": "application/json",
            "sec-ch-ua":
                '"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            Referer: "https://cloud.meilisearch.com/projects",
            "Referrer-Policy": "no-referrer-when-downgrade",
        },
        body: JSON.stringify({
            name: "info",
            resource_id: 89,
            ms_version: "v1.3.4",
            dump_file: null,
            team_id,
        }),
        method: "POST",
    }).then((res) => res.json());
};
const register = (email, password = "1234567890aA") =>
    fetch("https://api.meilisearch.com/api/v1/users", {
        headers: {
            accept: "application/json, text/plain, */*",
            "accept-language":
                "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "content-type": "application/json",
            "sec-ch-ua":
                '"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            Referer: "https://cloud.meilisearch.com/register",
            "Referrer-Policy": "no-referrer-when-downgrade",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.81",
        },
        body: JSON.stringify({
            user: {
                name: Math.random().toString(),
                email,
                password: password,
                confirm_password: password,
                company: "",
                terms_accepted: true,
            },
        }),
        method: "POST",
    }).then((res) => res.json());

import inquirer from "https://esm.sh/inquirer";
inquirer
    .prompt([
        {
            type: "input",
            name: "email",
            message: "邮件地址",
            default: "test@snapmail.cc",
        },
    ])
    .then((answers) => {
        return register(answers.email);
    })
    .then((res) => {
        console.log(JSON.stringify(res), null, 4);
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "email",
                    message: "等待您完成邮箱验证，输入任意值继续",
                    default: "",
                },
            ])
            .then(() => {
                return {
                    token: res.data.token_info.token,
                    team_id: res.data.user.teams[0].id,
                };
            });
    })
    .then(({ token, team_id }) => {
        return createMachine(token, team_id);
    })
    .then((res) => {
        console.log(res);
    });
