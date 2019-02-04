package com.ibm.test.Model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Size;

@Entity
public class BankCard implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "BC_ID_PK")
	private long bcIdPk;
	
	@Column(name = "BC_NUMBER")
	@Size(max = 20)
	private String bcNumber;
	
	@Column(name = "BC_CCV")
	@Digits(integer = 4, fraction = 0)
	private short bcCcv; 
		
	@Column(name = "BC_TYPE")
	@Size(max = 50)
	private String bcType;
	
	@ManyToOne
	@JoinColumn(name = "BC_CUSTOMER_ID_FK")
	private Customer bcCustomerIdFk;
	
	@OneToMany(mappedBy = "ccBankCardIdFk", cascade = CascadeType.REMOVE)
	private Set<CardConsumption> cardConsumption;

	public BankCard() {
		
	}

	public BankCard(long bcIdPk, @Size(max = 20) String bcNumber, @Digits(integer = 4, fraction = 0) short bcCcv,
			@Size(max = 50) String bcType, Customer bcCustomerIdFk) {
		
		this.bcIdPk = bcIdPk;
		this.bcNumber = bcNumber;
		this.bcCcv = bcCcv;
		this.bcType = bcType;
		this.bcCustomerIdFk = bcCustomerIdFk;
	}

	public long getBcIdPk() {
		return bcIdPk;
	}

	public void setBcIdPk(long bcIdPk) {
		this.bcIdPk = bcIdPk;
	}

	public String getBcNumber() {
		return bcNumber;
	}

	public void setBcNumber(String bcNumber) {
		this.bcNumber = bcNumber;
	}

	public short getBcCcv() {
		return bcCcv;
	}

	public void setBcCcv(short bcCcv) {
		this.bcCcv = bcCcv;
	}

	public String getBcType() {
		return bcType;
	}

	public void setBcType(String bcType) {
		this.bcType = bcType;
	}

	public Customer getBcCustomerIdFk() {
		return bcCustomerIdFk;
	}

	public void setBcCustomerIdFk(Customer bcCustomerIdFk) {
		this.bcCustomerIdFk = bcCustomerIdFk;
	}

}
