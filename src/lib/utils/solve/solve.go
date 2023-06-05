package main

import (
	"fmt"
	"sort"
)

type Operation func(a, b int) int

func add(a, b int) int {
	return a + b
}

func multiply(a, b int) int {
	return a * b
}

func subtract(a, b int) int {
	result := a - b
	if result < 0 {
		panic("result is negative")
	}
	return result
}

func divide(a, b int) int {
	if a%b != 0 {
		panic("a is not divisible by b")
	}
	return a / b
}

func calculate(operation Operation, a, b int) int {
	return operation(a, b)
}

type OperationWithOperator struct {
	Operator  string
	Operation Operation
}

var operations = []OperationWithOperator{
	{"+", add},
	{"×", multiply},
	{"-", subtract},
	{"÷", divide},
}

type Calculation struct {
	Numbers []int
	Steps   []string
}

func diff(a, b []int) []int {
	diff := []int{}
	for _, x := range a {
		found := false
		for _, y := range b {
			if x == y {
				found = true
				break
			}
		}
		if !found {
			diff = append(diff, x)
		}
	}
	return diff
}

func contains(s []int, e int) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func findSolutions(numbers []int, target int, operations []OperationWithOperator) []Calculation {
	if contains(numbers, target) {
		return []Calculation{{Numbers: numbers, Steps: []string{}}}
	}

	var solutions []Calculation
	queue := []Calculation{{Numbers: numbers, Steps: []string{}}}
	memo := make(map[string]bool)

	for len(queue) > 0 {
		sort.Slice(queue, func(i, j int) bool {
			return len(queue[i].Numbers) > len(queue[j].Numbers)
		})

		calculation := queue[0]
		queue = queue[1:]

		for i := range calculation.Numbers {
			for j := range calculation.Numbers {
				if i == j {
					continue
				}

				for _, operation := range operations {
					var result int
					func() {
						defer func() {
							if r := recover(); r != nil {
								return // continue to the next iteration
							}
						}()
						result = calculate(operation.Operation, calculation.Numbers[i], calculation.Numbers[j])
					}()

					remainingNumbers := append(diff(calculation.Numbers, []int{calculation.Numbers[i], calculation.Numbers[j]}), result)

					steps := append([]string{fmt.Sprintf("%d%s%d=%d", calculation.Numbers[i], operation.Operator, calculation.Numbers[j], result)}, calculation.Steps...)

					newCalculation := Calculation{Numbers: remainingNumbers, Steps: steps}

					key := fmt.Sprintf("%v:%d", newCalculation.Numbers, len(newCalculation.Steps))
					if _, ok := memo[key]; ok {
						continue
					}
					memo[key] = true

					if contains(newCalculation.Numbers, target) {
						solutions = append(solutions, newCalculation)
					} else if len(newCalculation.Numbers) > 1 {
						queue = append(queue, newCalculation)
					}
				}
			}
		}
	}

	return solutions
}

func main() {
	numbers := []int{1, 2, 3, 4, 5, 6, 7, 8}
	target := 123

	solutions := findSolutions(numbers, target, operations)

	sort.Slice(solutions, func(i, j int) bool {
		return len(solutions[i].Steps) < len(solutions[j].Steps)
	})

	if len(solutions) > 0 {
		solution := solutions[0]
		fmt.Printf("Found a solution with %d steps:\n", len(solution.Steps))
		for _, step := range solution.Steps {
			fmt.Printf("  %s\n", step)
		}
	} else {
		fmt.Println("No solutions found")
	}
}
