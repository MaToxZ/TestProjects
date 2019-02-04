package com.ibm.test.Model;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Size;

@Entity
@Table(name = "CUSTOMER")
public class Customer implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "C_ID_PK")
	private long cIdPk;
	
	@Column(name = "C_NAME")
	@Size(max = 50)
	private String cName;
	
	@Column(name = "C_ADDRESS")
	@Size(max = 100)
	private String cAddress;
	
	@Column(name = "C_CITY")
	@Size(max = 30)
	private String cCity;
	
	@Column(name = "C_PHONE")
	@Digits(integer = 20, fraction = 0)
	private BigInteger cPhone;
	
	@OneToMany(mappedBy = "bcCustomerIdFk", cascade = CascadeType.REMOVE)
	private Set<BankCard> bankCards;
	
	
	public Customer() {
		super();
	}

	public Customer(long cIdPk, @Size(max = 50) String cName, @Size(max = 100) String cAddress,
			@Size(max = 30) String cCity, @Digits(integer = 20, fraction = 0) BigInteger cPhone) {
		super();
		this.cIdPk = cIdPk;
		this.cName = cName;
		this.cAddress = cAddress;
		this.cCity = cCity;
		this.cPhone = cPhone;
	}

	public long getcIdPk() {
		return cIdPk;
	}

	public void setcIdPk(long cIdPk) {
		this.cIdPk = cIdPk;
	}

	public String getcName() {
		return cName;
	}

	public void setcName(String cName) {
		this.cName = cName;
	}

	public String getcAddress() {
		return cAddress;
	}

	public void setcAddress(String cAddress) {
		this.cAddress = cAddress;
	}

	public String getcCity() {
		return cCity;
	}

	public void setcCity(String cCity) {
		this.cCity = cCity;
	}

	public BigInteger getcPhone() {
		return cPhone;
	}

	public void setcPhone(BigInteger cPhone) {
		this.cPhone = cPhone;
	}
	
	

}
