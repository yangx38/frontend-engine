-- 如果有缘
1. 所有 sync check 应该move到后段去
2. log 持久化
3. jwt
4. mainpage
5. 查重
6. rollback / transaction

-- API 所有用的

index.js src/common/form
localhost:8080/upload 有8个

actionCreators.js src/common/form/store
localhost:8080/api/systemadmin/getAllBudgets -- 1

actionCreators.js src/common/login/store
localhost:8080/api/login/checkWhetherUserIsSystemAdministrator -- 1
localhost:8080/api/login/checkWhetherUserIsFiscalStaff -- 1
localhost:8080/api/login/checkWhetherUserIsSubmitter -- 1

actionCreators.js src/pages/systemadmin/unitsbudgetspeople/store
localhost:8080/api/systemadmin/getAllUnitSubunit -- 1
localhost:8080/api/systemadmin/getAllSubmitter -- 1
localhost:8080/api/systemadmin/getAllFiscalStaff -- 1



--- 配置
GoogleLogIn
clientId = '767966548929-ghusim71l8qt3jv5ub8bhomtfg8t7787.apps.googleusercontent.com';