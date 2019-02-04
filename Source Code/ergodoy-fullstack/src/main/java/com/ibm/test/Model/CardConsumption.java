package com.ibm.test.Model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Size;

@Entity
public class CardConsumption implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	@Column(name = "CC_ID_PK")
	private long ccIdPk;
	
	@Column(name = "CC_DATE")
	private Date ccDate;
	
	@Column(name = "CC_DESCRIPTION")
	@Size(max = 100)
	private String ccDescription;
	
	@Column(name = "CC_AMOUNT")
	@Digits(integer = 12, fraction = 2)
	private Double ccAmount;

	@ManyToOne
	@JoinColumn(name = "CC_BANKCARD_ID_FK")
	private BankCard ccBankCardIdFk;

	public CardConsumption() {
		
	}

	public CardConsumption(long ccIdPk, Date ccDate, @Size(max = 100) String ccDescription,
			@Digits(integer = 12, fraction = 2) Double ccAmount, BankCard ccBankCardIdFk) {
		this.ccIdPk = ccIdPk;
		this.ccDate = ccDate;
		this.ccDescription = ccDescription;
		this.ccAmount = ccAmount;
		this.ccBankCardIdFk = ccBankCardIdFk;
	}

	public long getCcIdPk() {
		return ccIdPk;
	}

	public void setCcIdPk(long ccIdPk) {
		this.ccIdPk = ccIdPk;
	}

	public Date getCcDate() {
		return ccDate;
	}

	public void setCcDate(Date ccDate) {
		this.ccDate = ccDate;
	}

	public String getCcDescription() {
		return ccDescription;
	}

	public void setCcDescription(String ccDescription) {
		this.ccDescription = ccDescription;
	}

	public Double getCcAmount() {
		return ccAmount;
	}

	public void setCcAmount(Double ccAmount) {
		this.ccAmount = ccAmount;
	}

	public BankCard getCcBankCardIdFk() {
		return ccBankCardIdFk;
	}

	public void setCcBankCardIdFk(BankCard ccBankCardIdFk) {
		this.ccBankCardIdFk = ccBankCardIdFk;
	}
	
	
}
