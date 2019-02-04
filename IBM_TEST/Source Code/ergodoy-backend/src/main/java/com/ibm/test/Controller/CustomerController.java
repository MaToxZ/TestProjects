package com.ibm.test.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ibm.test.Interface.CustomerServiceLocal;
import com.ibm.test.Model.Customer;

@Controller
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	CustomerServiceLocal customerServiceLocal;

	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody Customer customer) {
		if (customer != null) {
			if (customerServiceLocal.createAndUpdate(customer)) {
				return ResponseEntity.ok(true);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@PutMapping("/edit")
	public ResponseEntity<?> edit(@RequestBody Customer customer) {
		if (customer != null) {
			if (customerServiceLocal.createAndUpdate(customer)) {
				return ResponseEntity.ok(true);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") long customerId) {
		if (customerServiceLocal.delete(customerId)) {
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

	}

	@GetMapping("/findAll")
	@ResponseBody
	public ResponseEntity<List<Customer>> findAll() {
		List<Customer> customers = customerServiceLocal.findAll();
		if (customers != null) {
			return ResponseEntity.ok(customers);
		} else {
			return ResponseEntity.noContent().build();
		}
	}

	@GetMapping("/find/{id}")
	@ResponseBody
	public ResponseEntity<Customer> find(@PathVariable("id") long customerId) {
		Customer customer = customerServiceLocal.find(customerId);
		if (customer != null) {
			return ResponseEntity.ok(customer);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
