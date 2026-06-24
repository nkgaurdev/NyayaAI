def compare_contracts(contract1, contract2):

    score1 = contract1.get("risk_score", 0)
    score2 = contract2.get("risk_score", 0)

    issues1 = len(contract1.get("issues", []))
    issues2 = len(contract2.get("issues", []))

    if abs(score1 - score2) <= 10:
        safer = "Both contracts have similar risk levels"

    elif score1 > score2:
        safer = "Contract 2"

    else:
        safer = "Contract 1"

    if safer == "Both contracts have similar risk levels":

        summary = f"""
Contract 1 contains {issues1} detected issues
while Contract 2 contains {issues2} detected issues.

Both agreements present a similar overall risk profile.
Workers should review the specific clauses before making a decision.
"""

    else:

        summary = f"""
Contract 1 contains {issues1} detected issues
while Contract 2 contains {issues2} detected issues.

Based on overall risk score and issue severity,
{safer} provides stronger worker protections.
"""

    return {
        "contract1_score": score1,
        "contract2_score": score2,
        "contract1_issues": issues1,
        "contract2_issues": issues2,
        "safer_contract": safer,
        "score_difference": abs(score1 - score2),
        "comparison_summary": summary,
    }