export const funcArry = {
    "fcnMsgArry": [
        {
            "fcnCd": "G1.AccountManage",
            "fcnNm": "账户管理",
            "lvl": "1",
            "prnFcnCd": "",
            "aprvlPrvgOpnFlg1": null,
            "invlAcctFlg": "0",
            "parentId": "",
            "checkFlg": null,
            "showFlg": "1",
            "acctMsg": null,
            "tplMsg": [],
            "bussTplMsg": [],
            "childList": [
                {
                    "fcnCd": "G2.AccountContractManage",
                    "fcnNm": "账户签约管理",
                    "lvl": "2",
                    "prnFcnCd": "G1.AccountManage",
                    "aprvlPrvgOpnFlg1": null,
                    "invlAcctFlg": "0",
                    "parentId": "G1.AccountManage",
                    "checkFlg": null,
                    "showFlg": "1",
                    "acctMsg": null,
                    "tplMsg": [],
                    "bussTplMsg": [],
                    "childList": [
                        {
                            "fcnCd": "F.AccountGroupingSettings",
                            "fcnNm": "账户分组设置",
                            "lvl": "3",
                            "prnFcnCd": "G2.AccountContractManage",
                            "aprvlPrvgOpnFlg1": null,
                            "invlAcctFlg": "1",
                            "parentId": "G2.AccountContractManage",
                            "checkFlg": null,
                            "showFlg": "1",
                            "acctMsg": [
                                {
                                    "acctCd": "03004427849",
                                    "acctNm": "博康璟有限公司"
                                },
                                {
                                    "acctCd": "03004427857",
                                    "acctNm": "博康璟有限公司"
                                }
                            ],
                            "tplMsg": [
                                {
                                    "tplNo": "pmc31112e12-666a-11ee-9e25-ba3c3fd8cb56",
                                    "tplNm": "通用审批模板",
                                    "tplTp": null,
                                    "bussAcctMsg": [
                                        {
                                            "acctCd": "03004427849",
                                            "acctNm": "博康璟有限公司"
                                        }
                                    ]
                                },
                                {
                                    "tplNo": "pmc1aa61226-46da-11ee-bd6f-fa163ece7e74",
                                    "tplNm": "新明模板3",
                                    "tplTp": null,
                                    "bussAcctMsg": [
                                        {
                                            "acctCd": "03004427849",
                                            "acctNm": "博康璟有限公司"
                                        }
                                    ]
                                }
                            ],
                            "bussTplMsg": [
                                {
                                    "tplNo": "pmc31112e12-666a-11ee-9e25-ba3c3fd8cb56",
                                    "tplNm": "通用审批模板",
                                    "tplTp": null,
                                    "bussAcctMsg": [
                                        {
                                            "acctCd": "03004427849",
                                            "acctNm": "博康璟有限公司"
                                        }
                                    ]
                                },
                                {
                                    "tplNo": "pmc1aa61226-46da-11ee-bd6f-fa163ece7e74",
                                    "tplNm": "新明模板3",
                                    "tplTp": null,
                                    "bussAcctMsg": [
                                        {
                                            "acctCd": "03004427849",
                                            "acctNm": "博康璟有限公司"
                                        }
                                    ]
                                }
                            ],
                            "childList": null
                        },
                        {
                            "fcnCd": "F.AccountBalanceSettings",
                            "fcnNm": "账户留底余额设置",
                            "lvl": "3",
                            "prnFcnCd": "G2.AccountContractManage",
                            "aprvlPrvgOpnFlg1": null,
                            "invlAcctFlg": "1",
                            "parentId": "G2.AccountContractManage",
                            "checkFlg": null,
                            "showFlg": "1",
                            "acctMsg": [
                                {
                                    "acctCd": "03004427849",
                                    "acctNm": "博康璟有限公司"
                                },
                                {
                                    "acctCd": "03004427857",
                                    "acctNm": "博康璟有限公司"
                                }
                            ],
                            "tplMsg": [
                                {
                                    "tplNo": "pmc31112e12-666a-11ee-9e25-ba3c3fd8cb56",
                                    "tplNm": "通用审批模板",
                                    "tplTp": null,
                                    "bussAcctMsg": []
                                }
                            ],
                            "bussTplMsg": [
                                {
                                    "tplNo": "pmc31112e12-666a-11ee-9e25-ba3c3fd8cb56",
                                    "tplNm": "通用审批模板",
                                    "tplTp": null,
                                    "bussAcctMsg": []
                                }
                            ],
                            "childList": null
                        }
                    ]
                },
                {
                    "fcnCd": "G2.AccountQry",
                    "fcnNm": "账户查询",
                    "lvl": "2",
                    "prnFcnCd": "G1.AccountManage",
                    "aprvlPrvgOpnFlg1": null,
                    "invlAcctFlg": "0",
                    "parentId": "G1.AccountManage",
                    "checkFlg": null,
                    "showFlg": "1",
                    "acctMsg": null,
                    "tplMsg": [],
                    "bussTplMsg": [],
                    "childList": [
                        {
                            "fcnCd": "F.AccountOverviewDeposit",
                            "fcnNm": "账户总览-存款账户",
                            "lvl": "3",
                            "prnFcnCd": "G2.AccountQry",
                            "aprvlPrvgOpnFlg1": null,
                            "invlAcctFlg": "0",
                            "parentId": "G2.AccountQry",
                            "checkFlg": null,
                            "showFlg": "1",
                            "acctMs": null
                        }
                    ]
                }
            ]
        }
    ]
}
