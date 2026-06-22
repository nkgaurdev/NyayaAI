def compare_contracts(contract1, contract2):

    score1 = contract1.get("risk_score", 0)
    score2 = contract2.get("risk_score", 0)

    if score1 > score2:
        safer = "Contract 2"

    elif score2 > score1:
        safer = "Contract 1"

    else:
        safer = "Both contracts have similar risk levels"

    return {
        "contract1_score": score1,
        "contract2_score": score2,
        "safer_contract": safer
    }