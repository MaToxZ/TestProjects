package com.ibm.test.Model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

@Entity
public class Adviser implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "A_ID_PK")
	private long aIdPk;
	
	@Column(name = "A_NAME")
	@Size(max = 50)
	private String aName;
	
	@Column(name = "A_SPECIALTY")
	@Size(max = 50)
	private String aSpecialty;

	public Adviser() {
		
	}

	public Adviser(long aIdPk, @Size(max = 50) String aName, @Size(max = 50) String aSpecialty) {
		this.aIdPk = aIdPk;
		this.aName = aName;
		this.aSpecialty = aSpecialty;
	}

	public long getaIdPk() {
		return aIdPk;
	}

	public void setaIdPk(long aIdPk) {
		this.aIdPk = aIdPk;
	}

	public String getaName() {
		return aName;
	}

	public void setaName(String aName) {
		this.aName = aName;
	}

	public String getaSpecialty() {
		return aSpecialty;
	}

	public void setaSpecialty(String aSpecialty) {
		this.aSpecialty = aSpecialty;
	}

}
